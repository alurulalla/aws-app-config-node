const express = require('express');
const { getProducts, getOffers } = require('../controller/productController');

const router = express.Router();

router.route('/').get(getProducts).get(getOffers);

module.exports = router;
