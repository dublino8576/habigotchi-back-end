import { createHabit } from "../models/habits-model.js";

export function addHabit(req, res, next) {
  const reqBody = req.body;
  const { user_id } = req.params;

  createHabit(reqBody, user_id)
    .then((addedHabit) => {
      res.status(201).send({ addedHabit: addedHabit });
    })
    .catch((err) => {
      next(err);
    });
}
