const express = require("express");
const userRouter = express.Router();
const { register, login } = require('../controllers/users');
const auth = require("../middleware/auth");

userRouter.post('/register', register);
userRouter.post('/login', login);

module.exports = userRouter;