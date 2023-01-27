const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');

router.delete(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        let imageToDelete = await SpotImage.findByPk(req.params.id, {
            include: {
                model: Spot,
                attributes: ['ownerId']
            }
        })

        if(!imageToDelete){
            const err = new Error("Spot image couldn't be found");
            err.status = 404;
            return next(err)
        }

        if (imageToDelete.Spot.ownerId !== +req.user.id){
            const err = new Error("Forbidden");
            err.title = "Authorization Error"
            err.status = 403;
            return next(err)
        }

        await imageToDelete.destroy();

        res.json({message: "Successfully Deleted"})
    }
)

module.exports = router;