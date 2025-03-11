import express from "express";
import {
  addUser,
  getUsers,
  getUserByUserId,
  patchUser,
  removeUser
} from "../controllers/users-controller.js";

const usersRouter = express.Router();

usersRouter.route("/").post(addUser).get(getUsers);
usersRouter.route("/:user_id").get(getUserByUserId).patch(patchUser).delete(removeUser);

export default usersRouter;
