import express from "express";
import categoryRouter from "./category-router.js";
import usersRouter from "./users-router.js";
import petsRouter from "./pets-router.js";
import habitsRouter from "./habits-router.js";

import { endpoints } from "../controllers/api-controller.js";



const apiRouter = express.Router();

apiRouter.use("/categories", categoryRouter);
apiRouter.use("/pets", petsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/habits", habitsRouter);


apiRouter.route("/endpoints").get(endpoints)
export default apiRouter;
