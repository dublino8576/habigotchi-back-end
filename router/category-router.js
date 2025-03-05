import express from "express";
import { getCategories } from "../controllers/category-controller";

const categoryRouter = express.Router();

categoryRouter.route("/").get(getCategories);

export default categoryRouter;
