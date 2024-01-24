const express = require('express');
const app = express();
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


app.get('/', (req, res) => {
    // sendSMS();
    res.send('Message send')
})

app.listen(5000, () => {
    console.log("server started running");
})