import express from "express";

import {postPet, getPet} from "../controllers/pets-controller.js"
const petsRouter = express.Router();

petsRouter.route("/").post(postPet)
petsRouter.route("/:user_name").get(getPet)
export default petsRouter

