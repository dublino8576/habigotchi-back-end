import express from "express";
import {
  addUser,
  getUsers,
  getUserByUserId,
} from "../controllers/users-controller.js";

const usersRouter = express.Router();

usersRouter.route("/").post(addUser).get(getUsers);
usersRouter.route("/:user_id").get(getUserByUserId);

export default usersRouter;
