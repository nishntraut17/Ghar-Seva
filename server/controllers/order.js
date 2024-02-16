const Order = require('../models/order');

const createOrder = async (req, res) => {
    try {
        /*
            get serviceProvider id from body
            get service id from req.body
            get user id from req.user
            create new order object
        */
        const order = await Order({ ...req.body, user: req.user });
        if (order) {
            res.send(order);
        }
        res.send(error);
    } catch (error) {
        res.send(error);
    }
}

module.exports = { createOrder };