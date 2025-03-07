import express from "express";
import { addHabit, getUserHabits } from "../controllers/habits-controller.js";

const habitsRouter = express.Router();

habitsRouter.route("/:user_id").post(addHabit).get(getUserHabits);

export default habitsRouter;
