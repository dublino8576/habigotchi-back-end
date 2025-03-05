import express from "express";
import categoryRouter from "./category-router";
const apiRouter = express.Router();

apiRouter.use("/categories", categoryRouter);

export default apiRouter;
