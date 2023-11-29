import express, { Application } from 'express';
import cors from 'cors';
import { UserRouter } from './modules/user/user.routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRouter);

export default app;
