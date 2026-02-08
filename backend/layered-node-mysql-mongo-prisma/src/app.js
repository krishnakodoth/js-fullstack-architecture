import express from 'express';
import orderRoutes from './routes/order.routes.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middleware/errorHandler.js';


const app = express();

app.use(express.json());

app.use('/orders', orderRoutes);
 app.use('/users', userRoutes);

app.use(errorHandler);

export default app;