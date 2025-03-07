import {
  createUser,
  fetchUserByUserId,
  fetchUsers,
} from "../models/users-model.js";

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

export function getUsers(req, res, next) {
  return fetchUsers()
    .then((allUsers) => {
      res.status(200).send({ allUsers: allUsers });
    })
    .catch((err) => {
      next(err);
    });
}

export function getUserByUserId(req, res, next) {
  const { user_id } = req.params;
  fetchUserByUserId(user_id)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch((err) => {
      next(err);
    });
}
