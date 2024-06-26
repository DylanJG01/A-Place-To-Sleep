// backend/routes/api/index.js
const router = require('express').Router();

const { restoreUser } = require('../../utils/auth.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js')
const reviewRouter = require('./reviews.js')
const bookingRouter = require('./bookings.js');
const spotImageRouter = require('./spot-images')
const reviewImageRouter = require('./review-images')

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter );
router.use('/reviews', reviewRouter)
router.use('/bookings', bookingRouter)
router.use('/spot-images', spotImageRouter)
router.use('/review-images', reviewImageRouter)


router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'DoggoMcDogDog'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
});

router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);

router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);

module.exports = router;
