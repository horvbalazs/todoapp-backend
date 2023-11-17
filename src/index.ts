import express from 'express';
import userRouter from './user/user.controller';
import todosRouter from './todos/todos.controller';
import config from './config';
import jwt from './_helpers/jwt';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from './_helpers/errorHandler';
import mongoose from 'mongoose';

const PORT = config.Port;
const app = express();

app.use(jwt());
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/todos', todosRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    (async () => {
        await mongoose.connect(config.ConnectionString);
        console.log(`Server is listening to port: ${PORT}`);
    })();
});