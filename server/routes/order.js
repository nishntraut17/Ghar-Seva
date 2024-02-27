const express = require('express');
const orderRouter = express.Router();
const auth = require("../middleware/auth");
const { createOrder, getServiceProviderOrder, getUserOrder, cancelOrder, serviceProviderAccepts, completeOrder, getAllOrdersByGroupId } = require('../controllers/order');

orderRouter.post('/', auth, createOrder);
orderRouter.get('/', auth, getServiceProviderOrder);
orderRouter.get('/user/:id', auth, getAllOrdersByGroupId);
orderRouter.get('/user', auth, getUserOrder);
orderRouter.put('/cancel/:id', auth, cancelOrder);
orderRouter.put('/service-provider-accept/:id', auth, serviceProviderAccepts);
orderRouter.put('/complete/:id', auth, completeOrder);

module.exports = orderRouter