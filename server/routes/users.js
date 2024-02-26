const express = require("express");
const userRouter = express.Router();
const { register, login, getAllUsers, getUser, updateUser, verifyEmail, rateAndReviewUser } = require('../controllers/users');
const auth = require("../middleware/auth");

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/verify-email', verifyEmail);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.put('/:id', updateUser);
userRouter.post('/update', updateUser);
userRouter.put('/rate-review/:id', rateAndReviewUser);

module.exports = userRouter;