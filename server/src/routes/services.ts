import express, { Router } from "express";
import auth from "../middleware/auth";
import { getService, getAllServices, addService, addUserToService, serviceNotInUser, serviceOfferedByServiceProvider } from "../controllers/services";

const serviceRouter: Router = express.Router();

serviceRouter.get('/', getAllServices);
serviceRouter.get('/:id', getService);
serviceRouter.post('/', addService);
serviceRouter.get('/not-in-user/:id', serviceNotInUser);
serviceRouter.put('/:id', addUserToService);
serviceRouter.get('/service-provided/:id', serviceOfferedByServiceProvider);

export default serviceRouter;
