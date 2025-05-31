import express from 'express';
import routes from './routes/routes';
import errorHandler from "./middlewares/errorHandler.middleware";
import bookRoutes from './routes/book.routes';
const app = express();

app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

export const listen = (port: any, callback: any) => app.listen(port, callback);
