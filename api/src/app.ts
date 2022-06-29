import cookieParser from 'cookie-parser';
import express, { Application, Request, Response, NextFunction } from 'express'
import morgan from 'morgan';
import config from './lib/config'
import cors from 'cors'
import routes from './routes/routes'
const app: Application = express();

app.use(express.urlencoded({ extended: true, limit: '50mb' })); //middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(
    cors({
        origin: config.cors,
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    })
);

interface error {
    status: number;
    message: string;
}

app.use((err: error, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const messege = err.message || err;
    console.log(err);
    res.status(status).send(messege)
});

app.use('/', routes);

export default app