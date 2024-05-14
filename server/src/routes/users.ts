import express, { Router } from "express";
import { register, login, getAllUsers, getUser, updateUser, verifyEmail, rateAndReviewUser, viewTestimonials } from '../controllers/users';
import auth from "../middleware/auth";

const userRouter: Router = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/verify-email', verifyEmail);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.put('/:id', updateUser);
userRouter.post('/update', updateUser);
userRouter.put('/rate-review/:id', rateAndReviewUser);
userRouter.get('/testimonials/:id', viewTestimonials);

export = userRouter;
