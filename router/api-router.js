import express from "express";
import categoryRouter from "./category-router.js";
import usersRouter from "./users-router.js";
import petsRouter from "./pets-router.js"

const apiRouter = express.Router();

apiRouter.use("/categories", categoryRouter);
apiRouter.use("/pets", petsRouter)
apiRouter.use("/users", usersRouter);


export default apiRouter;
