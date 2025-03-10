import express from "express";
import {
  addUser,
  getUsers,
  getUserByUserId,
  patchUser,
} from "../controllers/users-controller.js";

const usersRouter = express.Router();

usersRouter.route("/").post(addUser).get(getUsers);
usersRouter.route("/:user_id").get(getUserByUserId).patch(patchUser);

export default usersRouter;
