import express from 'express';
import CarsRouter from "./cars.router";

const ApiRouter = express.Router();
ApiRouter.use('/cars', CarsRouter);

export default ApiRouter;