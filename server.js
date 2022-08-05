const express = require('express');
const dotenv = require('dotenv').config();
const productsRoute = require('./routes/productsRoute');
const getOffersRoute = require('./routes/offersRoute');

const app = express();

const PORT = process.env.PORT;

app.use('/api/products', productsRoute);
app.use('/api/offers', getOffersRoute);

app.listen(PORT, console.log(`app running on Port: ${PORT}`));
