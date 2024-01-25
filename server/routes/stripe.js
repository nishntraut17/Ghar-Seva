const express = require("express");
const stripeRouter = express.Router();
const { checkout } = require('../controllers/stripe');
const auth = require("../middleware/auth");

stripeRouter.post('/', auth, checkout);

module.exports = stripeRouter;