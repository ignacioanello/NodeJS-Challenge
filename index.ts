import express from 'express';
import Routes from './routes';
import dotenv from 'dotenv';
import { getDbConnection } from './database/config';

dotenv.config();

const app = express();

app.use(express.json());

getDbConnection();

Routes.configure(app);

app.use((req: express.Request, res: express.Response) => {
    res.status(404).send('NOT FOUND');
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).send('Custom error');
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});