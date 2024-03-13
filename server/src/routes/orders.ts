import express, { Router } from 'express';
import auth from "../middleware/auth";
import { Request, Response } from 'express';
import { createOrder, getServiceProviderOrder, getUserOrder, cancelOrder, serviceProviderAccepts, completeOrder, getAllOrdersByGroupId } from '../controllers/orders';

const orderRouter: Router = express.Router();

orderRouter.post('/', auth, (req: Request, res: Response) => createOrder(req, res));
orderRouter.get('/', auth, (req: Request, res: Response) => getServiceProviderOrder(req, res));
orderRouter.get('/user/:id', auth, (req: Request, res: Response) => getAllOrdersByGroupId(req, res));
orderRouter.get('/user', auth, (req: Request, res: Response) => getUserOrder(req, res));
orderRouter.put('/cancel/:id', auth, (req: Request, res: Response) => cancelOrder(req, res));
orderRouter.put('/service-provider-accept/:id', auth, (req: Request, res: Response) => serviceProviderAccepts(req, res));
orderRouter.put('/complete/:id', auth, (req: Request, res: Response) => completeOrder(req, res));

export default orderRouter;
