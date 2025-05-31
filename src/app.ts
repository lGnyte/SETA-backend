import express from 'express';
import routes from './routes/routes';
import errorHandler from "./middlewares/errorHandler.middleware";
import cors from 'cors';
import { CORS_ORIGINS } from "./config/dotenv.config";

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || CORS_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

export const listen = (port: any, callback: any) => app.listen(port, callback);
