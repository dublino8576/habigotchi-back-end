import { createHabit, fetchUserHabits } from "../models/habits-model.js";

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

export function getUserHabits(req, res, next) {
  const { user_id } = req.params;

  fetchUserHabits(user_id)
    .then((userHabits) => {
      res.status(200).send({ userHabits: userHabits });
    })
    .catch((err) => {
      next(err);
    });
}
