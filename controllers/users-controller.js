import { createUser } from "../models/user-model";

export function addUser(req, res, next) {
  const reqBody = req.body;

  createUser(reqBody)
    .then((addedUser) => {
      res.status(201).send({ addedUser: addedUser });
    })
    .catch((err) => {
      next(err);
    });
}
