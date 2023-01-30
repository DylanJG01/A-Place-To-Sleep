const express = require('express');
const { ExclusionConstraintError } = require('sequelize');
const router = express.Router();
const { Spot, Review, Booking, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op, DataTypes } = require('sequelize')

router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {
        
        let userBookings = await Booking.findAll({
            where: {userId: req.user.id},
        });
        
        userBookings = userBookings.map(el => el.toJSON())

        let spots = [];

        for(let booking of userBookings){
           let spot = await Spot.findByPk(booking.spotId)
           spots.push(spot.toJSON())
        }

        userBookings = userBookings.map((el, index) => {
            el.Spot = spots[index];
            return el;
        })

        res.json({Bookings: userBookings})
    }
);

router.put(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        const err = new Error();
        let bookingToEdit = await Booking.findByPk(req.params.id)
        
        if(!bookingToEdit){
            err.message = "Booking couldn't be found";
            res.status(404);
            return next(err);
        }
        
        if(req.user.id !== bookingToEdit.userId){
            err.message = "Forbidden";
            res.status(404);
            return next(err);
        }
        
        let spot = bookingToEdit.toJSON().spotId

        
        const { startDate, endDate } = req.body;

        if(bookingToEdit.toJSON().endDate < new Date()){
            err.message = "Past bookings can't be modified"
        }

        if (new Date(startDate) < new Date() || new Date(endDate) < new Date()) {
            err.message = "Cannot start or end booking in the past";
            res.status(403);
            return next(err)
        } 

        let arrivalDate = new Date(startDate).toISOString().replace('-', '/').split('T')[0].replace('-', '/');
        let departureDate = new Date(endDate).toISOString().replace('-', '/').split('T')[0].replace('-', '/');

        arrivalDate = parseInt(arrivalDate.split("/").join(""));
        departureDate = parseInt(departureDate.split("/").join(""));

        if (endDate <= startDate) {
            err.message = "Validation error";
            err.endDate = "endDate cannot be on or before startDate";
            res.status(400);
            return next(err);
        }

        const bookings = await Booking.findAll({
            where: {
                spotId: spot,
                id: {
                    [Op.not]: +req.params.id
                }
            }
        })

        const bookingDates = bookings.map(el => {
            let startDate = el.startDate.toISOString().replace('-', '').replace('-', '').split('T')[0]
            let endDate = el.endDate.toISOString().replace('-', '').replace('-', '').split('T')[0]
            return [startDate, endDate]
        })

        for (let booking of bookingDates) {

            if (arrivalDate >= booking[0] && arrivalDate <= booking[1]) {
                err.startDate = "Start date conflicts with an existing booking"
            }
            if (departureDate >= booking[0] && departureDate <= booking[1]) {
                err.endDate = "End date conflicts with an existing booking"
            }
            if (Object.entries(err).length) {
                res.status(403)
                err.message = "Sorry, this spot is already booked for the specified dates"
                return next(err)
            }

            const bookedDays = [parseInt(booking[0])];
            const conflicts = []
            while (booking[0] < booking[1]) {
                ++booking[0];
                bookedDays.push(booking[0])
            }

            let dayToBook = arrivalDate;
            while (dayToBook < departureDate) {
                if (bookedDays.includes(dayToBook)) {
                    // console.log(dayToBook.toString())
                    let day = dayToBook.toString().split('').slice(6).join('')
                    let month = dayToBook.toString().split('').slice(4, 6).join('')
                    let year = dayToBook.toString().split('').slice(0, 4).join('')
                    // console.log(month, day, year)
                    conflicts.push(`Booking conflict: ${month}-${day}-${year}`)
                }
                ++dayToBook;
            }
            if (conflicts.length) {
                res.status(403)
                err.message = "Sorry, this spot is already booked for the specified dates"
                err.conflicts = conflicts
                return next(err)
            }
        }

        await bookingToEdit.update({
            userId: +req.user.id,
            startDate,
            endDate,
        })

        return res.json(bookingToEdit)
    }
)

router.delete(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        const err = new Error();
        let booking = await Booking.findByPk(+req.params.id);
        
        if(!booking){
            err.message = "Booking couldn't be found";
            res.status(404);
            return next(err); 
        }

        let spot = await Spot.findByPk(booking.toJSON().spotId);

        if(+req.user.id !== booking.toJSON().userId &&
            +req.user.id !== spot.toJSON().ownerId){
            err.message = "Forbidden";
            res.status(403);
            return next(err)
        }

        if (new Date(booking.toJSON().endDate) < new Date()){
            err.message = "Bookings that have been resolved can't be deleted"
            res.status(403)
            return next(err)
        }

        if (new Date(booking.toJSON().startDate) < new Date()){
            err.message = "Bookings that have been started can't be deleted"
            res.status(403)
            return next(err)
        }

        await booking.destroy();
        
        return res.json({message: "Successfully deleted"})
    }
)

router.use(
    (errors, req, res, next) => {
        if (errors.message === "Authentication required") {
            res.status(401)
            return next(errors)
        }
        if (errors.message.includes('Validation')
            && errors.message.includes('failed')) {
            errors.status = 400;
            return next(errors)
        }
        const message = errors.message;
        delete errors.message;

        let response = {}
        response.message = message;
        if (Object.entries(errors).length) { response.errors = errors }
        return res.json({
            ...response
        })
    }
);

module.exports = router;