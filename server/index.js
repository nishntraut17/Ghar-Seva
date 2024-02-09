const express = require('express');
const serviceRouter = require('./routes/service');
const userRouter = require('./routes/users');
const stripeRouter = require('./routes/stripe');
const app = express();
const cors = require('cors');
require('dotenv').config();
require("./db/conn");

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use('/api/user', userRouter);
app.use('/api/service', serviceRouter);
app.use('/api/stripe', stripeRouter);

app.get('/', (req, res) => {
    // sendSMS();
    res.send('Get Request')
})

app.listen(5000, () => {
    console.log(`Server Running on port: ${5000}`);
})