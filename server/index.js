const express = require('express');
const serviceRouter = require('./routes/service');
const userRouter = require('./routes/users');
const stripeRouter = require('./routes/stripe');
const app = express();
const cors = require('cors');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = async (body) => {
    let messageOptions = {
        from: process.env.TWILIO_FROM_NUMBER,
        to: '+919925275684',
        body: "Hello from node"
    }
    try {
        const message = await client.messages.create(messageOptions);
        console.log(message);
    } catch (error) {
        console.log(error);
    }
}

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