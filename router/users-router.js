import express from "express";
import { addUser, getUsers } from "../controllers/users-controller.js";

const usersRouter = express.Router();

usersRouter.route("/").post(addUser).get(getUsers);

export default usersRouter;
