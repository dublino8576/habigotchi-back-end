import express from "express";
import {postPet} from "../controllers/pets-controller"
const petsRouter = express.Router();

petsRouter.route("/:user_name").post(postPet)

export default petsRouter