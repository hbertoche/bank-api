import express, { Application } from 'express';
import userRoutes from './routes/user.route';
import transactionRoutes from './routes/transaction.route';

const app: Application = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

export default app;
