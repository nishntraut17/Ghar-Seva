const nodemailer = require('nodemailer');

const Order = require('../models/order');
const User = require('../models/users');
const Service = require('../models/service');

const generateUniqueId = () => {
    return 'id_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}

const createOrder = async (req, res) => {
    try {
        console.log(req.body);
        const service = await Service.findById(req.body.service);

        // Check if service exists
        const groupId = generateUniqueId();

        if (!service) {
            return res.status(404).send('Service not found');
        }

        const orders = await Promise.all(req.body.cityServiceProviders.map(async (providerId) => {
            const order = new Order({ ...req.body, serviceProvider: providerId, user: req.user._id, groupId: groupId });
            await order.save();

            const serviceProvider = await User.findById(providerId);

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "nishantraut90@gmail.com",
                    pass: process.env.EMAIL_PASS,
                },
            })

            const mailOptions = {
                from: '"Gharseva Admin" <nishantraut90@gmail.com>',
                to: serviceProvider.email,
                subject: "New Order",
                html: `<p>Hello ${serviceProvider.name},</p> <br/>
                <span>There is a new order for ${service.name}</span> <br/>
                <span>Please Login to your account and go to order -> new order section to view more details.</span>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email Sent to all Service Providers");
                }
            });

            return order;
        }));

        res.send(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


const getServiceProviderOrder = async (req, res) => {
    try {
        const user = req.user._id;
        const orders = await Order.find({ serviceProvider: user })
            .populate('user', ['name', 'email', 'profileImage'])
            .populate('service', ['name']);
        return res.send(orders);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const getAllOrdersByGroupId = async (req, res) => {
    try {
        const groupId = req.params.id;
        const orders = await Order.find({ groupId: groupId })
            .populate('serviceProvider', ['name', 'email', 'profileImage'])
            .populate('service', ['name']);

        res.send(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const cancelOrder = async (req, res) => {
    try {
        console.log("Order cancel ye wala chal raha hai");
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
        // Update the status of the current order to 'completed'
        console.log("Updating current order to 'completed'...");
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
        console.log("Current order updated:", updatedOrder);

        // Find all orders with the same groupId
        console.log("Finding other orders with the same groupId...");
        const otherOrders = await Order.find({ groupId: updatedOrder.groupId });
        console.log("Other orders with the same groupId:", otherOrders);

        // Update the status of other orders in the same group to 'cancelled'
        console.log("Updating status of other orders in the same group to 'cancelled'...");
        await Promise.all(otherOrders.map(async (otherOrder) => {
            if (otherOrder._id.toString() !== req.params.id) {
                otherOrder.status = 'cancelled';
                await otherOrder.save();
            }
        }));

        console.log("All orders in the group updated successfully.");
        res.send(updatedOrder);
    } catch (error) {
        console.error("Error occurred:", error);
        res.send(error);
    }
};


const getUserOrder = async (req, res) => {
    try {
        const user = req.user;
        const orders = await Order.find({ user: user })
            .populate('serviceProvider', ['name', 'email', 'profileImage'])
            .populate('service', ['name']);

        // Group orders by groupId
        const groupedOrders = orders.reduce((acc, order) => {
            if (!acc[order.groupId]) {
                acc[order.groupId] = [];
            }
            acc[order.groupId].push(order);
            return acc;
        }, {});

        return res.send(groupedOrders);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};


const serviceProviderAccepts = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, { status: req.body.status, fees: req.body.fees }, { new: true })
            .then((updatedOrder) => {
                res.send(updatedOrder);
            }).catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports = { createOrder, getServiceProviderOrder, getUserOrder, cancelOrder, serviceProviderAccepts, completeOrder, getAllOrdersByGroupId };