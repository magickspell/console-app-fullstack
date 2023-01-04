import express, {Express} from 'express';
import mongoose from 'mongoose';
import {MigrateCars} from "./migration/cars.migration";
import AppRouter from "./router/index.router";

// App could be created with free mongodb and injected credentials via dotenv (or just ENV) library, but I used docker.
/*import dotenv from 'dotenv';
dotenv.config();*/

const bodyParser = require('body-parser');
const cors = require('cors');
const PORT: number = 3001; // variables can be passed like this - process.env.PORT; (but I use static here, because docker)
const MONGO_HOST: string = process.env.MONGO_HOST ? process.env.MONGO_HOST : 'localhost:27017';
const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(AppRouter);

mongoose.connect(`mongodb://${MONGO_HOST}/console-cars`).then(() => {
    console.log('[server]: MongoDB connected');
    MigrateCars();
}).catch((e) => {
    console.log(`[error]: failed to connect to "${MONGO_HOST}"\n${e}`)
});

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

export default app;