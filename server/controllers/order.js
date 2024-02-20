const Order = require('../models/order');

const createOrder = async (req, res) => {
    try {
        console.log(req.body);
        const order = await Order({ ...req.body, user: req.user });
        await order.save();
        res.send(order);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const getServiceProviderOrder = async (req, res) => {
    try {
        const user = req.user;
        const orders = await Order.find({ serviceProvider: user })
            .populate('user', ['name', 'email', 'profileImage'])
            .populate('service', ['name']);
        return res.send(orders);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}


const changeStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        await Order.findByIdAndUpdate(req.params.id, { status: req.body.status, fees: 50 }, { new: true })
            .then((updatedOrder) => {
                res.send(updatedOrder);
            }).catch((err) => console.log(err));

    } catch (error) {
        console.log("Error : ", error);
    }
}

const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
            .then((updatedOrder) => {
                res.send(updatedOrder);
            }).catch((err) => console.log(err));
    } catch (error) {
        res.send(error);
    }
}

const completeOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
            .then((updatedOrder) => {
                res.send(updatedOrder);
            }).catch((err) => console.log(err));
    } catch (error) {
        res.send(error);
    }
}

const getUserOrder = async (req, res) => {
    try {
        const user = req.user;
        const orders = await Order.find({ user: user })
            .populate('serviceProvider', ['name', 'email', 'profileImage'])
            .populate('service', ['name']);
        return res.send(orders);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const serviceProviderAccepts = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        await Order.findByIdAndUpdate(req.params.id, { status: req.body.status, fees: req.body.fees }, { new: true })
            .then((updatedOrder) => {
                res.send(updatedOrder);
            }).catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const userAccept = async (req, res) => {
    try {
        // const { service } = req.body;

        // const lineItems = products.map((product) => ({
        //     price_data: {
        //         currency: "inr",
        //         product_data: {
        //             name: product.name
        //         },
        //         unit_amount:  * 100,
        //     },
        //     quantity: product.quantity
        // }))
        // const session = await stripe.checkout.sessions.create({
        //     payment_method_types: ["card"],
        //     line_items: lineItems,
        //     mode: "payment",
        //     success_url: "http://localhost:3000",
        //     cancel_url: "http://localhost:3000",
        // })
        // console.log(session);

        // res.json({ url: session.url });

        // const order = await Order.findById(req.params.id);
        // await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
        //     .then((updatedOrder) => {
        //         res.send(updatedOrder);
        //     }).catch((err) => console.log(err));

    } catch (error) {
        console.log("Error : ", error);
    }
}


module.exports = { createOrder, getServiceProviderOrder, changeStatus, getUserOrder, cancelOrder, serviceProviderAccepts, completeOrder };