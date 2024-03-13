import { Request, Response } from 'express';
import ServiceModel from '../models/services';
import UserModel from '../models/users';

export const getAllServices = async (req: Request, res: Response): Promise<void> => {
    try {
        const services = await ServiceModel.find();
        res.send(services);
    } catch (error) {
        res.status(500).send("Unable to get all services");
    }
};

export const getService = async (req: Request, res: Response): Promise<void> => {
    try {
        const service = await ServiceModel.findById(req.params.id).populate('serviceProviders', ['name', 'email', 'profileImage', 'city']);
        if (!service) {
            res.status(400).send("Service not found");
            return;
        }
        res.send(service);
    } catch (error) {
        res.send(error);
    }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
    try {
        const service = await ServiceModel.findByIdAndDelete(req.params.id);
        if (!service) {
            res.status(400).send('No such service exists');
            return;
        }
        res.send(`${service.name} has been deleted`);
    } catch (error) {
        res.send(error);
    }
};

export const addService = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = new ServiceModel(req.body);
        await result.save();
        console.log(result);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
};

export const addUserToService = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate request data
        if (!req.params.id || !req.body.user) {
            res.status(400).send('Invalid request data');
            return;
        }

        const service = await ServiceModel.findById(req.params.id);
        const user = await UserModel.findById(req.body.user._id);

        if (!service) {
            res.status(404).send('Service not found');
            return;
        }

        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        // Assuming req.body.user is an ObjectId or a user object
        if (!user.services) {
            user.services = []; // Initialize user.services if it's undefined
        }
        user.services.push(service._id);
        await user.save();

        if (!service.serviceProviders) {
            service.serviceProviders = [];
        }
        service.serviceProviders.push(req.body.user._id);
        const updatedService = await service.save();

        // Log the updated service before sending it back
        console.log(updatedService);

        // Send the updated service object as the response
        res.send(updatedService);
    } catch (error) {
        // Log the error for debugging
        console.error('Error adding user to service:', error);
        // Send an appropriate error response
        res.status(500).send('Internal Server Error');
    }
};

export default { getAllServices, getService, addService, deleteService, addUserToService };
