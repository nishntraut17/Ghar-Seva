import express from 'express';
import serviceRouter from './routes/services';
import userRouter from './routes/users';
import orderRouter from './routes/orders';
import cors from 'cors';
import dotenv from 'dotenv';
import './db/conn';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use('/api/user', userRouter);
app.use('/api/service', serviceRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send('Get Request');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});
