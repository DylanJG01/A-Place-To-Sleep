const express = require('express')
const router = express.Router();
const { Spot, Review, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {

        
    }
)


module.exports = router;