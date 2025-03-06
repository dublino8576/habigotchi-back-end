import express from "express";
import categoryRouter from "./category-router";
import petsRouter from "./pets-router"
const apiRouter = express.Router();

apiRouter.use("/categories", categoryRouter);
apiRouter.use("/pets", petsRouter)

export default apiRouter;
