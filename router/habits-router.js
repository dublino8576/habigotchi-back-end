import express from "express";
import { addHabit } from "../controllers/habits-controller.js";

const habitsRouter = express.Router();

habitsRouter.route("/:user_id").post(addHabit);

export default habitsRouter;
