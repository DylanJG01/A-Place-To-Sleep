const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        // .exists({checkFalsy: true })
        .isLength({ min: 1})
        .withMessage('First name is required.'),
    check('lastName')
        // .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Last name is required.'),
    handleValidationErrors
];

router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
        
        const { email, password, username, firstName, lastName } = req.body;
        const user = await User.signup({ email, username, password, firstName, lastName });
        
        await setTokenCookie(res, user);

        return res.json({
            user: user
        });
    }
);


router.get(
    '/',
    async (req, res) => {
        const allUsers = await User.findAll()
        res.json(allUsers)
    }
);
    
router.delete( 
    '/current',
    requireAuth,
    async (req, res) => {
        deleteUser = await User.findByPk()
        deleteUser.delete();
    }
    );
    
    
router.use((err, req, res, next) => {
    err.status = 400
    if (err.errors[0].message){
        if (err.errors[0].message.includes('unique')){
            err.status = 403
        }
    }
    next(err)
})
    
    
module.exports = router;