const express = require("express");
const serviceRouter = express.Router();
const auth = require("../middleware/auth");
const { getService, getAllServices } = require('../controllers/service');


serviceRouter.get('/', getAllServices);
serviceRouter.get('/:id', getService);

module.exports = serviceRouter;