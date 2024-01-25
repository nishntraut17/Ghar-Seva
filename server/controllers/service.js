const Service = require("../models/service");

const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
    } catch (error) {
        res.status(500).send("Unable to get all services");
    }
}

const getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate('serviceProviders', ['_id', 'name', 'email', 'mobile', 'profileImage']);
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
        res.send(result);
    } catch (error) {
        res.send(error);
    }
}

module.exports = { getAllServices, getService, addService, deleteService };