import express, { Router } from "express";
import auth from "../middleware/auth";
import { getService, getAllServices, addService, addUserToService } from "../controllers/services";

const serviceRouter: Router = express.Router();

serviceRouter.get('/', getAllServices);
serviceRouter.get('/:id', getService);
serviceRouter.post('/', addService);
serviceRouter.put('/:id', addUserToService);

export default serviceRouter;
