const express = require('express')
const router = express.Router();
const { Spot, Review, ReviewImage, User, SpotImage } = require('../../db/models');
const review = require('../../db/models/review');
const { requireAuth } = require('../../utils/auth');


router.get(
    '/current',
    requireAuth,
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
            let previewImage = await SpotImage.findOne({
                where: {
                    spotId: spot.id,
                    preview: true
                },
                attributes: ['url']
            })

            let reviewImages = await ReviewImage.findAll({
                where: {reviewId : +review.id},
                attributes: ['id', 'url']
            })

            reviewImages.forEach(el => {
                el = el.toJSON();
            })
            review.User = user.toJSON();

            if(!previewImage) previewImage = "No preview image"

            spot = spot.toJSON();
            delete spot.createdAt
            delete spot.updatedAt
            delete spot.description
            review.Spot = spot
            review.Spot.previewImage = previewImage
            review.ReviewImages = reviewImages
            
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
        
        if (req.user.id !== review.userId) {
            err.message = "Forbidden";
            res.status(403);
            return next(err);
        }

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
        res.json(reviewImage)
    }
)


router.put(
    '/:id',
    requireAuth,
    async (req, res, next) => { 
        const err = new Error();
        const reviewToEdit = await Review.findByPk(req.params.id);
        
        if(!reviewToEdit){
            err.message = "Review couldn't be found";
            res.status(404);
            return next(err)
        }

        if (req.user.id !== reviewToEdit.userId){
            const err = new Error();
            err.message = "Forbidden";
            res.status(403);
            return next(err);
        }

        const editedBody = {};
        const { review, stars } = req.body;


        if (!stars || +stars % 1 !== 0 || +stars > 5 || +stars < 1) err.stars = "Stars must be an integer from 1 to 5";
        if (!review.length) err.review = "Review text is required";

        if (Object.entries(err).length){
            res.status(400);
            err.message = "Validation error";
            return next(err)
        }
        if (review) editedBody.review = review;
        if (stars) editedBody.stars = stars;


        await reviewToEdit.update({...editedBody});
        
        return res.json(reviewToEdit)
    }
)

router.delete(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        const reviewToDelete = await Review.findByPk(req.params.id);
        const err = new Error();

        if (!reviewToDelete){
            err.message = "Review couldn't be found";
            res.status(404);
            return next(err);
        }
        if (+req.user.id !== reviewToDelete.userId){
            err.message = "Forbidden";
            res.status(403);
            return next(err);
        }

        await reviewToDelete.destroy()

        return res.json({message: "Successfully deleted"});
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