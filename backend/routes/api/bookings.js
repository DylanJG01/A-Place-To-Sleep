const express = require('express')
const router = express.Router();
const { Spot, Review, Booking, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

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
            el.spot = spots[index];
            return el;
        })

        res.json(userBookings)
    }
)


module.exports = router;