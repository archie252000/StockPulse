const express = require('express');
const auth = require('../middleware/auth');

const {
    subscibeToStock,
    searchStocks
} = require('../controllers/stockController');

const router = express.Router();

// @route    POST api/stocks/subscribe
// @desc     Subscribe to stock
// @access   Private
router.post('/subscribe', auth, subscibeToStock);

// @route    GET api/stocks/search
// @desc     Subscribe to stock
// @access   Public
router.get('/search', searchStocks);

module.exports = router;