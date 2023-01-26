const express = require('express')
const router = express.Router();
const { Spot, Review, SpotImage, sequelize} = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Op } = require('sequelize')
const { check } = require('express-validator');
const { application } = require('express');

router.get(
    '/current',
    async (req, res, next) => {
        console.log(req.user)
        const userSpots = await Spot.findAll({
            where: {
                ownerId: req.user.id
            },
            include: [
                {
                    model: SpotImage, as: 'previewImage',
                    attributes: ['url']
                },
            ],
        })
        const spotsWithReview = [];
        
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
            spotsWithReview.push(spot)
        }
        res.json({spotsWithReview})
    }
);

router.get(
    '/:id',
    async (req, res, next) => {
        const spotById = await Spot.findByPk(req.params.id, {
            include: [
                {
                    model: SpotImage, as: 'previewImage',
                    attributes: ['url']
                },
            ],
        })
        
        if (!spotById){
            const err = new Error();
            err.message = "Couldn't find a Spot with the specified id"
            err.status = 404;
            return next(err);
        }

        let spot = spotById
        const spotsWithReview = []

        let review = await Review.findAll({
            where: {
                userId: spotById.ownerId
            },
            attributes:
                [[sequelize.fn('AVG', sequelize.col('stars')), 'averageRating']]
        })
        spot = spot.toJSON()
        spot.averageRating = review[0].toJSON().averageRating
        spotsWithReview.push(spot)
        
        return res.json(spotsWithReview[0])
    }
)

    
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
            {model: SpotImage, as: 'previewImage', 
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

    return res.json({spotsWithReview, page, size})
    }
)

router.post(
    '/:id/images',
    requireAuth,
    async (req, res, next) => {
        const { url, preview } = req.body;

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
        res.json(newSpotImg)
    }
)

router.put(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const err = new Error();
        const updatedSpot = {}

        if(address){
            if (address.length > 256) err.address = "Street Address must be between 1 and 256 characters"
            else updatedSpot.address = address
        }
        if (city){
            if(city.length > 50 || city.length < 1){
                err.city = "City must be between 1 and 50 characters"
            }
            else updatedSpot.city = city
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
            if(!description || description.length > 256){
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
        const spot = await Spot.findByPk(+req.params.id)
        
        await spot.update({...updatedSpot})
        
        res.status(201)
        return res.json(spot)
    }

)

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
)

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
)



router.use(
    (errors, req, res, next) => {
        if(errors.message === "Authentication required") res.status(401)
       return res.json({
            errors
    })
})



module.exports = router;