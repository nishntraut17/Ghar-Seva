import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import OrderModel from '../models/orders';
import UserModel from '../models/users';
import ServiceModel from '../models/services';

interface AuthRequest extends Request {
    user?: any; // Define the user property here with appropriate type
}

const generateUniqueId = (): string => {
    return 'id_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        console.log(req.body);
        const service = await ServiceModel.findById(req.body.service);

        // Check if service exists
        const groupId = generateUniqueId();

        if (!service) {
            res.status(404).send('Service not found');
            return;
        }

        const orders = await Promise.all(req.body.cityServiceProviders.map(async (providerId: string) => {
            const order = new OrderModel({ ...req.body, serviceProvider: providerId, user: req.user._id, groupId: groupId });
            await order.save();

            const serviceProvider = await UserModel.findById(providerId);

            // Check if serviceProvider is null and skip to the next iteration
            if (!serviceProvider) {
                console.log("No service provider found for ID:", providerId);
                return null;
            }

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "nishantraut90@gmail.com",
                    pass: process.env.EMAIL_PASS as string,
                },
            });

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
                    console.log("Email Sent to service provider:", serviceProvider.email);
                }
            });

            return order;
        }));

        // Filter out any null values from the orders array
        const validOrders = orders.filter(order => order !== null);

        res.send(validOrders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


export const getServiceProviderOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = req.user._id;
        const orders = await OrderModel.find({ serviceProvider: user })
            .populate('user', ['name', 'email', 'profileImage'])
            .populate('service', ['name']);
        res.send(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const getAllOrdersByGroupId = async (req: Request, res: Response): Promise<void> => {
    try {
        const groupId = req.params.id;
        const orders = await OrderModel.find({ groupId: groupId })
            .populate('serviceProvider', ['name', 'email', 'profileImage'])
            .populate('service', ['name']);
        res.send(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const cancelOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Order cancellation in progress");
        const order = await OrderModel.findById(req.params.id);
        const updatedOrder = await OrderModel.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.send(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const completeOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Updating current order to 'completed'...");
        const updatedOrder = await OrderModel.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });

        if (!updatedOrder) {
            res.status(404).send("No such order found.");
            return;
        }

        console.log("Finding other orders with the same groupId...");
        const otherOrders = await OrderModel.find({ groupId: updatedOrder.groupId });

        console.log("Updating status of other orders in the same group to 'cancelled'...");
        await Promise.all(otherOrders.map(async (otherOrder: any) => {
            if (otherOrder._id.toString() !== req.params.id) {
                otherOrder.status = 'cancelled';
                await otherOrder.save();
            }
        }));

        console.log("All orders in the group updated successfully.");
        res.send(updatedOrder);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send(error);
    }
};

export const getUserOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = req.user;
        const orders = await OrderModel.find({ user: user })
            .populate('serviceProvider', ['name', 'email', 'profileImage'])
            .populate('service', ['name']);

        const groupedOrders: { [key: string]: any[] } = orders.reduce((acc: any, order: any) => {
            if (!acc[order.groupId]) {
                acc[order.groupId] = [];
            }
            acc[order.groupId].push(order);
            return acc;
        }, {});

        res.send(groupedOrders);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

export const serviceProviderAccepts = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(req.params.id, { status: req.body.status, fees: req.body.fees }, { new: true });
        res.send(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};