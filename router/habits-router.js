import express from "express";
import {
  addHabit,
  getUserHabits,
  removeHabit,
  updateHabit,
} from "../controllers/habits-controller.js";

const habitsRouter = express.Router();

habitsRouter.route("/:user_id").post(addHabit).get(getUserHabits);

habitsRouter.route("/:habit_id").delete(removeHabit).patch(updateHabit);

export default habitsRouter;
