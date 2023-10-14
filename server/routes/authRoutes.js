const express = require('express');
const auth = require('../middleware/auth');

const {
    loginUser,
    registerUser,
    notificationToken
} = require('../controllers/authControllers');

const router = express.Router();

// @route    POST api/auth/register
// @desc     Register user and get token
// @access   Public
router.post('/register', registerUser);

// @route    POST api/auth/login
// @desc     Register user and get token
// @access   Public
router.post('/login', loginUser);

// @route    POST api/auth/notification
// @desc     Register user and get token
// @access   private

router.post('/notification-token', auth, notificationToken);



module.exports = router;