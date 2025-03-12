import express from "express";

import { postPet, getPet, patchPet } from "../controllers/pets-controller.js";
const petsRouter = express.Router();

petsRouter.route("/").post(postPet);
petsRouter.route("/:user_name").get(getPet).patch(patchPet);

export default petsRouter;
