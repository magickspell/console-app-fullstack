import express, {Express} from 'express';
import mongoose from 'mongoose';
import router from "./router/api/cars.router";
import {MigrateCars} from "./migration/cars.migration";

// App could be created with free mongodb and injected credentials via dotenv (or just ENV) library, but I used docker.
/*import dotenv from 'dotenv';
dotenv.config();*/

const bodyParser = require('body-parser');
const cors = require('cors');
const PORT: number = 3001; // variables can be passed like this - process.env.PORT; (but I use static here, because docker)
const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

mongoose.connect('mongodb://localhost:27017/console-cars').then(() => {
    console.log('[server]: MongoDB connected');
    MigrateCars();
}).catch((e) => {
    console.log(`[error]: ${e}`)
});

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
