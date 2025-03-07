import express from "express";
import {
  addHabit,
  getUserHabits,
  removeHabit,
} from "../controllers/habits-controller.js";

const habitsRouter = express.Router();

habitsRouter.route("/:user_id").post(addHabit).get(getUserHabits);

habitsRouter.route("/:habit_id").delete(removeHabit);

export default habitsRouter;
