import express from "express";
import categoryRouter from "./category-router";
import userRouter from "./user-router";
const apiRouter = express.Router();

apiRouter.use("/categories", categoryRouter);
apiRouter.use("/users", userRouter);

export default apiRouter;
