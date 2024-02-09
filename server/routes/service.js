const express = require("express");
const serviceRouter = express.Router();
const auth = require("../middleware/auth");
const { getService, getAllServices, addService, addUserToService } = require('../controllers/service');


serviceRouter.get('/', getAllServices);
serviceRouter.get('/:id', getService);
serviceRouter.post('/', addService);
serviceRouter.put('/:id', addUserToService);

module.exports = serviceRouter;