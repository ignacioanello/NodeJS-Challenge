import express from 'express';
import Routes from './routes';
import dotenv from 'dotenv';
import { dbConnection } from './database/config';

//Need to do this ASAP for configuring .env variables.
dotenv.config();

const app = express();

//Read and Parse Body
app.use(express.json());

//Database
dbConnection();

Routes.configure(app);

//Si no lo maneja ningun otro handler (incluyendo los de adentro del get), lo agarra este que es 
//generico. Seria como un all.
app.use((req: express.Request, res: express.Response) => {
    res.status(404).send('NOT FOUND');
});

//Si usamos el middleware con 4 parametro, Node sabe que es para el error.
//Por ejemplo si es disparado con un next(New Error('blabla'))
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).send('Custom error');
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});