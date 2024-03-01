import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';
import userRoute from './routes/user.routes.js';
import courseRoute from './routes/course.routes.js';
import paymentRoute from './routes/payment.routes.js';
import miscRoute from './routes/miscellaneous.routes.js';
import connectToDB from './config/dbConnection.js';
import morgan from 'morgan';

const app = express();

connectToDB();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/ping' , ( req , res) => {
    res.send('Pong');
});

app.use('/api/v1/user' , userRoute);
app.use('/api/v1/course' , courseRoute);
app.use('/api/v1/payment' , paymentRoute);
app.use('/api/v1' , miscRoute);

app.use('*' , ( req , res) => {
    res.status(404).send('Oops!! 404 page not found');
});

app.use(errorMiddleware);

export default app;