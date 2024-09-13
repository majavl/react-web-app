import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import databaseConnection from './db';
import cors from 'cors';
import router from './routes/apiRoutes';

const app = express();
const PORT = 3000;

const allowCrossDomain = function (req : Request, res :Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    next();
};
app.use(allowCrossDomain);
app.use(cors());
app.use(
    '/api',
    bodyParser.json(),
    router,
);

// connect to MongoDB
databaseConnection();

app.listen(PORT, () => {
   console.log(`Server is running at port: ${PORT}`)
});

