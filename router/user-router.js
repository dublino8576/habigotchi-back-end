import express from "express";
import { getUsers } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.route("/").get(getUsers);

export default userRouter;
