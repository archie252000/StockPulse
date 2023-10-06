const express = require('express');

const {
    loginUser,
    registerUser
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



module.exports = router;