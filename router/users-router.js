import express from "express";
import { addUser } from "../controllers/users-controller";

const usersRouter = express.Router();

usersRouter.route("/").post(addUser);

export default usersRouter;
