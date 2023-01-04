import express from 'express';
import ApiRouter from "./api/root.router";

const AppRouter = express.Router();
AppRouter.use('/api', ApiRouter);

export default AppRouter;