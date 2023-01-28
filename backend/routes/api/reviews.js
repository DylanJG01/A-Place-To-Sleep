const express = require('express')
const router = express.Router();
const { Spot, Review, ReviewImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');


router.get(
    '/current',
    async (req, res) => {
        
        const reviews = await Review.findAll({
            where: {userId: +req.user.id},
        })

        const reviewsWithImages = [];

        for(let review of reviews){
            review = review.toJSON();

            let spot = await Spot.findByPk(review.spotId)
            let user = await User.findByPk(+req.user.id, {
                attributes: ['id', 'firstName', 'lastName']
            })

            let images = await ReviewImage.findAll({
                where: {reviewId : +review.id},
                attributes: ['id', 'url']
            })

            images.forEach(el => {
                el = el.toJSON();
            })
            review.User = user.toJSON();
            review.Spot = spot
            review.ReviewImages = images
            
            reviewsWithImages.push(review)
        }

        res.json({Reviews: reviewsWithImages})
    }
)

router.post(
    '/:id/images',
    requireAuth,
    async (req, res, next) => {
        const err = new Error();

        let review = await Review.findByPk(req.params.id)

        if(!review){
            err.message = "Review couldn't be found";
            res.status(404);
            return next(err);
        }
        review = review.toJSON();

        let reviewImages = await ReviewImage.findAll({
            where: {reviewId: review.id}
        })

        if (reviewImages.length >= 10){
            err.message = "Maximum number of images for this resource was reached";
            res.status(403);
            return next(err);
        }

        const { url } = req.body;

        const reviewImage = await ReviewImage.create({
            reviewId: req.params.id,
            url
        })

        console.log(reviewImage)
        res.json(reviewImage)
    }
)

router.use(
    (errors, req, res, next) => {
        if (errors.message === "Authentication required") res.status(401)
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