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
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(400).send("Service not found");
        }
        res.send(service);
    } catch (error) {
        res.send(error);
    }
}

/*

*/