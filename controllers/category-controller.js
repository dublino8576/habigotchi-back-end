import { fetchCategories } from "../models/category-model.js";

export function getCategories(req, res, next) {
  return fetchCategories()
    .then((allCategories) => {
      res.status(200).send({ allCategories: allCategories });
    })
    .catch((err) => {
      next(err);
    });
}
