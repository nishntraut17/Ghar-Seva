const Service = require("../models/service");
const User = require("../models/users");

const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.send(services);
    } catch (error) {
        res.status(500).send("Unable to get all services");
    }
}

const getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate('serviceProviders', ['name', 'email', 'profileImage', 'city']);
        if (!service) {
            return res.status(400).send("Service not found");
        }
        res.send(service);
    } catch (error) {
        res.send(error);
    }
}

const deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(400).send('No such service exists');
        }
        res.send(`${service.name} has been deleted`);
    } catch (error) {
        res.send(error);
    }
}

const addService = async (req, res) => {
    try {
        const result = await Service(req.body);
        await result.save();
        console.log(result);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}

const addUserToService = async (req, res) => {
    try {
        // Validate request data
        if (!req.params.id || !req.body.user) {
            return res.status(400).send('Invalid request data');
        }

        const service = await Service.findById(req.params.id);
        const user = await User.findById(req.body.user._id);

        if (!service) {
            return res.status(404).send('Service not found');
        }

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Assuming req.body.user is an ObjectId or a user object
        user.services.push(service._id);
        user.save();
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
}


module.exports = { getAllServices, getService, addService, deleteService, addUserToService };