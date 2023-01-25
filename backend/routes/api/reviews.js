const express = require('express')
const router = express.Router();
const { Spot, Review } = require('../../db/models');


router.get(
    '/',
    async (req, res) => {
        
        const reviews = await Review.findAll({
            include: {model: Spot}
        })
        res.json(reviews)
    }
)


module.exports = router;