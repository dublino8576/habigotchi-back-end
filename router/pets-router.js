import express from "express";
import { postPet } from "../controllers/pets-controller.js";
const petsRouter = express.Router();

petsRouter.route("/").post(postPet);

export default petsRouter;
