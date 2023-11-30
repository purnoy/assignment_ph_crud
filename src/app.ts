import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRouter } from './modules/user/user.routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the User API ');
});

app.all('*', (req: Request, res: Response) => {
    res.json({
        success: false,
        message: 'Invalid url',
        error: {
            code: 404,
            description: 'This is not an authorized url',
        },
    });
});

export default app;
