const express = require('express')
const router = express.Router();
const { Spot, Review, SpotImage, sequelize, User, Booking, ReviewImage} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Op, DataTypes } = require('sequelize')
const { check } = require('express-validator');
const { application } = require('express');
const user = require('../../db/models/user');
const review = require('../../db/models/review');

router.get(
    '/:id/reviews',
    async (req, res, next) => {
        const err = new Error();

        let spot = await Spot.findByPk(req.params.id)

        if (!spot){
            err.message = "Spot couldn't be found";
            res.status(404);
            return next(err)
        }

        const reviews = await Review.findAll({
            where: {spotId: +req.params.id}
        })

        const reviewsWithImages = [];

        for (let review of reviews) {
            review = review.toJSON();

            // let spot = await Spot.findByPk(review.spotId)
            let user = await User.findByPk(+req.user.id, {
                attributes: ['id', 'firstName', 'lastName']
            })

            let images = await ReviewImage.findAll({
                where: { reviewId: +review.id },
                attributes: ['id', 'url']
            })

            images.forEach(el => {
                el = el.toJSON();
            })
            review.User = user.toJSON();
            // review.Spot = spot
            review.ReviewImages = images

            reviewsWithImages.push(review)
        }

        res.json({ Reviews: reviewsWithImages })
    }
)

router.get(
    '/:id/bookings',
    async (req, res, next) => {

        let spotBookings = await Booking.findAll({
            where: { spotId: req.params.id }
        })
        const spot = await Spot.findByPk(+req.params.id)

        if (!spot) {
            const err = new Error();
            res.status(404);
            err.message = 'Spot does not exist';
            return next(err)
        }
        if (!spotBookings.length){
            return res.json("Spot has no bookings")
        }

        if (req.user && (+req.user.id == spot.ownerId)) {
            let users = spotBookings.map(el => {
                el = el.toJSON();
                return el.userId;
            })
            users = await User.findAll({
                where: {
                    id: {
                        [Op.in]: users
                    }
                },
                attributes: ['id', 'firstName', 'lastName']
            })

            spotBookings = spotBookings.map((el, index) => {
                (el = el.toJSON())
                let user = users[index].toJSON()
                el.User = user
                return el
            })
            return res.json(spotBookings)
        }

        spotBookings = spotBookings.map(el => {
            el = el.toJSON()
            el = {
                spotId: el.spotId,
                startDate: el.startDate,
                endDate: el.endDate
            }
            return el;
        })
        return res.json({ Bookings: spotBookings })
    }
);

router.get(
    '/current',
    async (req, res, next) => {

        if (!req.user){
            const err = new Error()
            err.message = "Not Logged In"
            res.status(403);
            return next(err)
        }
        const userSpots = await Spot.findAll({
            where: {
                ownerId: req.user.id
            },
            include: [
                {
                    model: SpotImage,
                    attributes: ['url']
                },
            ],
        })
        const spots = [];
        
        for (let spot of userSpots) {
            // console.log(spot.toJSON())
            let review = await Review.findAll({
                where: {
                    userId: spot.ownerId
                },
                attributes:
                [[sequelize.fn('AVG', sequelize.col('stars')), 'averageRating']]
            })
            spot = spot.toJSON()
            spot.averageRating = review[0].toJSON().averageRating
            spots.push(spot)
        }

        for (let spot of spots) {
            let previewImage;

            spot.SpotImages.forEach(el => {
                if (el.preview === true) {
                    previewImage = el.preview.url
                }
            })
            if (!previewImage) {
                previewImage = "No image preview"
            }
            delete spot.SpotImages;
            spot.preview = previewImage
        }

        res.json({spots})
    }
);

router.get(
    '/:id',
    async (req, res, next) => {
        
        if(isNaN(parseInt(req.params.id))) {
            const err = new Error("Spot couldn't be found");
            res.status(404);
            return next(err);            
        }

        const spotById = await Spot.findByPk(req.params.id, {
            include: [
                {
                    model: SpotImage,
                    attributes: ['url']
                },
                {
                    model: User,
                    attributes:['id','firstName','lastName']
                }
            ],
        })
        
        if (!spotById){
            const err = new Error();
            err.message = "Couldn't find a Spot with the specified id"
            res.status(404)
            return next(err);
        }

        let spot = spotById
        const spotsWithReview = []

        let review = await Review.findAll({
            where: {
                userId: spotById.ownerId
            },
            attributes:
            [[sequelize.fn('AVG', sequelize.col('stars')),'averageRating'],
            [sequelize.fn('COUNT', sequelize.col('stars')), 'reviews']
        ]
        })

        spot = spot.toJSON()
        spot.averageRating = review[0].toJSON().averageRating
        spot.reviews = review[0].toJSON().reviews
        spotsWithReview.push(spot)
        
        return res.json(spotsWithReview[0])
    }
);

    
router.get( // I want to refactor the for loop
    '/',
    async (req, res, next) => {
        
        const error = new Error();
        let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
        
        const where = {};
        const pagination = {};
        
        if(!page) page = 1;
        if(!size) size = 5;
        page = parseInt(page)
        size = parseInt(size)
        minLat = parseInt(minLat)
        minLng = parseInt(minLng)
        minPrice = parseInt(minPrice)
        maxPrice = parseInt(maxPrice)
        
        
    if(isNaN(page) || (page < 1 || page > 10)){  
        error.page = 'Page must be greater than or equal to 1'
    }
    if(isNaN(size) || (size < 1 || size > 20)){
        error.size = 'Size must be greater than or equal to 1 and less than 10'
    }  
    if(minLat && (isNaN(minLat) || (minLat < -90 || minLat > 90))){
        error.minLat = 'Invalid minimum latitude value'
    }
    if(maxLat && (isNaN(maxLat) || (maxLat < -90 || maxLat > 90))){
        error.maxLat = 'Invalid maximum latitude value'
    }
    if(minLng && isNaN(minLng) || (minLng < -180 || minLng > 180)) {
        error.minLng = 'Invalid minimum longitude value'
    }
    if(maxLng && isNaN(maxLng) || (maxLng < -180 || maxLng > 180)) {
        error.maxLng = 'Invalid maximum longitude value'
    }
    if(minPrice && isNaN(minPrice) || (minPrice < 0)){
        error.minPrice = 'Minimum price must be at least and decimal value of 0'
    }
    if(maxPrice && isNaN(maxPrice) || (maxPrice < 0)) {
        error.maxPrice = 'Maximum price must be at least and decimal value of 0'
    }
    //Could add error that says "Min price cannot be greater than max price,
    //but for now, the normal search filter will just return no results, which is acceptable

    if(Object.entries(error).length) {
        res.status(400)
        error.message = "Validation Error"
        return next(error)
    }

    if (maxLat && minLat) where.lat = { [Op.between]: [minLat, maxLat] }
    else if(minLat) where.lat = {[Op.gte]: minLat}
    else if(maxLat) where.lat = {[Op.lte]: maxLat}

    if (maxLng && minLng) where.lng = { [Op.between]: [minLng, maxLng] }
    else if (minLng) where.lng = { [Op.gte]: minLng }
    else if (maxLng) where.lng = { [Op.lte]: maxLng }
    
    minPrice ? where.price = {[Op.gte]: minPrice} : null
    maxPrice ? where.price = {[Op.lte]: maxPrice} : null
    minPrice && maxPrice ? where.price = {[Op.between]: [minPrice, maxPrice]} : null
    
    pagination.limit = size;
    pagination.offset = size * (page - 1)


    const allSpots = await Spot.findAll({
        include:[
            {model: SpotImage},
        ],
        where,
        ...pagination
    });

    const spots = [];

    for (let spot of allSpots) {
        // console.log(spot.toJSON())
        let review = await Review.findAll({
            where: {
                userId: spot.ownerId
            },
            attributes:
            [[sequelize.fn('AVG', sequelize.col('stars')), 'averageRating']]
        })
        spot = spot.toJSON()
        spot.averageRating = review[0].toJSON().averageRating
    
        spots.push(spot)
    }

    for (let spot of spots){
        let previewImage;

        spot.SpotImages.forEach(el => {
            if(el.preview === true){
                previewImage = el.preview.url
            }
        })
        if(!previewImage){
            previewImage = "No image preview"
        }
        delete spot.SpotImages;
        spot.preview = previewImage
    }

    return res.json({spots, page, size})
    }
);
router.post(
    '/:id/reviews',
    requireAuth,
    async (req, res, next) => {
        const err = new Error();

        let spot = await Spot.findByPk(req.params.id);
        let alreadyReviewed = await Review.findAll({
            where : {
                spotId: +req.params.id,
                userId: +req.user.id
            }
        })

        if (!spot) {
            err.message = "Spot couldn't be found"
            res.status(404);
            return next(err);
        }

        if(alreadyReviewed.length){
            err.message = "User already has a review for this spot";
            res.status(403);
            return next(err)
        }

        const {review, stars} = req.body;

        if(!review.length){
            err.review = "Review text is required";
        }
        if((parseInt(stars) > 5 || parseInt(stars) < 1
            || parseInt(stars) % 1 !== 0 )){
            err.stars = "Stars must be an integer from 1 to 5"
        }
        if (Object.entries(err).length){
            err.message = "Validation Error";
            res.status(400);
            return next(err)
        }
    
        
        const newReview = await Review.create({
            spotId: +req.params.id,
            userId: +req.user.id,
            review, 
            stars
        })
        res.json(newReview)
    }
)
router.post(
    '/:id/bookings',
    requireAuth,
    async (req, res, next) => {
        const err = new Error();

        let spot = await Spot.findByPk(req.params.id);

        if(!spot){
            err.message = "Spot couldn't be found"
            res.status(404);
            return next(err);
        }

        if (spot.ownerId === +req.user.id) {
            err.message = "Authorization Error, cannot book spot you own";
            res.status(403);
            return next(err);
        }

        const { startDate, endDate } = req.body;
        console.log(startDate, new Date())

        if (new Date(startDate) < new Date() || new Date(endDate) < new Date()) {
            err.message = "Cannot start or end booking in the past";
            res.status(400);
            return next(err)
        } 

        // console.log()
        // console.log(Date.parse(startDate))
        // console.log(Date.parse(endDate))
        // console.log()
        

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
                spotId: +req.params.id
            }
        })

        const bookingDates = bookings.map(el => {
            let startDate = el.startDate.toISOString().replace('-', '').replace('-', '').split('T')[0]
            let endDate = el.endDate.toISOString().replace('-', '').replace('-', '').split('T')[0]
            return [startDate, endDate]
        })

        for(let booking of bookingDates) {

            if (arrivalDate >= booking[0] && arrivalDate <= booking[1]){
                err.startDate = "Start date conflicts with an existing booking"
            }
            if (departureDate >= booking[0] && departureDate <= booking[1]){
                err.endDate = "End date conflicts with an existing booking"
            }
            if(Object.entries(err).length){
                res.status(403)
                err.message = "Sorry, this spot is already booked for the specified dates"
                return next(err)
            }

            //This needs to be refactored later
            //it counts through days/months that aren't real
            const bookedDays = [parseInt(booking[0])];
            const conflicts = []
            while (booking[0] < booking[1]){
                ++booking[0];
                bookedDays.push(booking[0])
            }

            let dayToBook = arrivalDate;
            while (dayToBook < departureDate){
                if(bookedDays.includes(dayToBook)){
                    console.log(dayToBook.toString())
                    let day = dayToBook.toString().split('').slice(6).join('')
                    let month = dayToBook.toString().split('').slice(4, 6).join('')
                    let year = dayToBook.toString().split('').slice(0, 4).join('')
                    console.log(bookedDays, dayToBook)
                    conflicts.push(`Booking conflict: ${month}-${day}-${year}`)
                }
                ++dayToBook;
            }
            if(conflicts.length){
                res.status(403)
                err.message = "Sorry, this spot is already booked for the specified dates"
                err.conflicts = conflicts
                return next(err)
            }
        }

        let newBooking = await Booking.create({
            userId: +req.user.id,
            spotId: +req.params.id,
            startDate,
            endDate,
        })
        res.json(newBooking)
    }
);

router.post(
    '/:id/images',
    requireAuth,
    async (req, res, next) => {
        let { url, preview } = req.body;

        const spot = await Spot.findByPk(+req.params.id);

        if(!spot){
            let err = new Error()
            err.message = "Spot couldn't be found";
            res.status(404)
            return next(err)
        }

        if (spot.ownerId !== +req.user.id){
            let err = new Error();
            err.message = "Forbidden"
            res.status(403)
            return next(err)
        }

        const newSpotImg = await SpotImage.create({
            spotId: req.params.id,
            url,
            preview
        })
        // console.log(newSpotImg)
        res.json(newSpotImg)
    }
);

router.put(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const err = new Error();
        const updatedSpot = {}

        const spot = await Spot.findByPk(+req.params.id)
        // console.log(spot.ownerId)

        if(!spot){
            err.message = "Spot does not exist";
            res.status(404);
            return next(err)
        }

        if(req.user.id !== spot.ownerId){
            err.message = "Forbidden"
            res.status(403)
            return next(err)
        }

        if(address){
            if (address.length > 255) err.address = "Street Address must be between 1 and 255 characters"
            else updatedSpot.address = address
        }
        if (city){
            if(city.length > 50 || city.length < 1){
                err.city = "City must be between 1 and 50 characters"
            }
            else updatedSpot.city = city
        }
        if(state){
            if(state.length < 1|| state.length > 50){
                err.state = 'State must be between 1 and 50 characters'
            } else updatedSpot.state = state
        }
        if (country) {
            if (country.length < 1 || country.length > 50) {
                err.country = 'Country must be between 1 and 50 characters'
            } else updatedSpot.country = country
        }
        if (lat){
            if((parseInt(lat) > 90) || parseInt(lat) < -90){
            err.lat = "Lat must be a number between -90 and 90 degrees"
            }
            else updatedSpot.lat = lat
        }
        if(lng){
            if((parseInt(lng) > 180 || parseInt(lng) < -180)){
                err.lng = "Lng Must be a number between -180 and 180 degrees"
            }
            else updatedSpot.lng = lng
        }
        if(name){
            if(name.length < 1 || name.length > 49){
                err.name = "Name must be more than 0 and less than 50 characters"
            }
            else updatedSpot.name = name
        }
        if(description){
            if(!description || description.length > 255){
                err.description = "Description must be between 1 and 255 characters"
            }
            else updatedSpot.description = description
        }
        if(price){
            if(price < 1){
                err.price = "Price per day is required and must be more than 0"
            }
            else updatedSpot.price = price
        }

        if (Object.entries(err).length){
            res.status(400)
            err.message = "Validation Error"
            return next(err)
        }
         
        await spot.update({...updatedSpot})
        
        res.status(201)
        return res.json(spot)
    }

);

router.post(
    '/',
    requireAuth,
    async (req, res, next) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const err = new Error();


        // console.log(req.user)
        if(!address || address.length > 256){
            err.address = "Street Address must be between 1 and 256 characters"
        }
        if(!city || city.length > 50){
            err.city = "City must be between 1 and 50 characters"
        }
        if(!lat || (parseInt(lat) > 90) || parseInt(lat) < -90){
            err.lat = "Lat must be a number between -90 and 90 degrees"
        } 
        if(!lng || (parseInt(lng) > 180 || parseInt(lng) < -180)){
            err.lng = "Lng Must be a number between -180 and 180 degrees"
        }
        if(!name || name.length > 49){
            err.name = "Name must be more than 0 and less than 50 characters"
        }
        if(!description || description.length > 256){
            err.description = "Description must be between 1 and 255 characters"
        }
        if(!price || price < 1){
            err.price = "Price per day is required and must be more than 0"
        }

        if (Object.entries(err).length){
            res.status(400)
            err.message = "Validation Error"
            return next(err)
        }
        const newSpot = await Spot.create({
            ownerId: req.user.id,
            address, 
            city, 
            state, 
            country, 
            lat, 
            lng, 
            name, 
            description, 
            price
        })
        
        res.status(201)
        return res.json(newSpot)
    }
);

router.delete(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        // console.log(req.user)

        const spotToDelete = await Spot.findByPk(+req.params.id);

        if(!spotToDelete){
            let err = new Error()
            err.message = "Could not find spot to delete";
            res.status(404)
            return next(err)
        }

        if (spotToDelete.ownerId !== +req.user.id){
            let err = new Error();
            err.message = "Forbidden"
            res.status(403)
            return next(err)
        }   

        await spotToDelete.destroy();
        res.status(200)
        return res.json({message: "Successfully Deleted"})
    }
);



router.use(
    (errors, req, res, next) => {
        if(errors.message === "Authentication required") res.status(401)
        if(errors.message.includes('Validation') 
            && errors.message.includes('failed')){
            errors.status = 400;
           return next(errors)
        }
        const message = errors.message;
        delete errors.message;

        let response = {}
        response.message = message;
        if (Object.entries(errors).length){response.errors = errors}
        return res.json({
            ...response
        })
    }
);



module.exports = router;