const express = require('express')
const router = express.Router();
const { Spot, Review, SpotImage, sequelize} = require('../../db/models');

const { Op } = require('sequelize')
const { check } = require('express-validator');
const { application } = require('express');



router.get( // I want to refactor the for loop
'/',
async (req, res, next) => {
    
    const errorArr = [];
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
        errorArr.push(new Error("Invalid Page Query"))
    //    console.log(errors)
    }
    if(isNaN(size) || (size < 1 || size > 20)){
        errorArr.push(new Error('Invalid Size Query'))
    }  
    if(minLat && (isNaN(minLat) || (minLat < -90 || minLat > 90))){
        errorArr.push(new Error ('Invalid minimum latitude value'))
    }
    if(maxLat && (isNaN(maxLat) || (maxLat < -90 || maxLat > 90))){
        errorArr.push(new Error('Invalid maximum latitude value'))
    }
    if(minLng && isNaN(minLng) || (minLng < -180 || minLng > 180)) {
        errorArr.push(new Error('Invalid minimum longitude value'))
    }
    if(maxLng && isNaN(maxLng) || (maxLng < -180 || maxLng > 180)) {
        errorArr.push(new Error('Invalid maximum longitude value'))
    }
    if(minPrice && isNaN(minPrice) || (minPrice < 0)){
        errorArr.push(new Error('Minimum price must be at least and decimal value of 0'))
    }
    if(maxPrice && isNaN(maxPrice) || (maxPrice < 0)) {
        errorArr.push(new Error('Maximum price must be at least and decimal value of 1'))
    }
    //Could add error that says "Min price cannot be greater than max price,
    //but for now, the normal search filter will just return no results, which is acceptable

    if(errorArr.length) {
        res.status(400)
        return next(errorArr)
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
            {model: SpotImage, as: 'Preview', 
            attributes: ['url']},
        ],
        where,
        ...pagination
    });

    const spotsWithReview = [];

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
        spotsWithReview.push(spot)
    }

    res.json({spotsWithReview, page, size})
    }
)


router.use(
    (err, req, res, next) => {
        const errors = {}
        errors.messages = []
        for( let i = 0; i < err.length; i++){
            errors.messages[i] = err[i].message
        }

        if (errors.messages.length) res.json({errors: errors.messages})
        else {
            res.status(500)
            res.json(err)
        }
})



module.exports = router;