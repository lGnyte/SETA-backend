import express from 'express';
import routes from './routes/routes';
import errorHandler from "./middlewares/errorHandler.middleware";
import bookRoutes from './routes/book.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use('/books', bookRoutes);

app.use(errorHandler);

export const listen = (port: any, callback: any) => app.listen(port, callback);
