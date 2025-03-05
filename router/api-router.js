import express from "express";
import categoryRouter from "./category-router";
import usersRouter from "./users-router";
const apiRouter = express.Router();

apiRouter.use("/categories", categoryRouter);

apiRouter.use("/users", usersRouter);

export default apiRouter;
