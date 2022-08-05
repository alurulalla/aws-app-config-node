const express = require('express');
const { getOffers } = require('../controller/productController');

const router = express.Router();

router.route('/').get(getOffers);

module.exports = router;
