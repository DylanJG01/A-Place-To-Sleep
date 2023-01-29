const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage } = require('../../db/models');

router.get(
    '/',
    async (req, res, next) => {
        const reviewImages = await ReviewImage.findAll()

        res.json(reviewImages)
    }
)

router.delete(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        let reviewImageToDelete = await ReviewImage.findByPk(req.params.id, {
            include: {
                model: Review,
                attributes: ['userId']
            }
        })

        if (!reviewImageToDelete) {
            const err = new Error("Review image couldn't be found");
            err.status = 404;
            return next(err)
        }

        if (reviewImageToDelete.toJSON().Review.userId !== +req.user.id) {
            const err = new Error("Forbidden");
            err.title = "Authorization Error"
            err.status = 403;
            return next(err)
        }

        await reviewImageToDelete.destroy();

        res.json({ message: "Successfully Deleted" })
    }
)
module.exports = router;