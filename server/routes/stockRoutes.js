const express = require('express');
const auth = require('../middleware/auth');

const { subscibeToStock } = require('../controllers/stockController');

const router = express.Router();

// @route    POST api/stocks/subscribe
// @desc     Subscribe to stock
// @access   Private
router.post('/subscribe', auth, subscibeToStock);

module.exports = router;