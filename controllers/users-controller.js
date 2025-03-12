import {
  createUser,
  fetchUserByUserId,
  fetchUsers,
  updateUser,
  deleteUser,
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

export function patchUser(req, res) {
  const userId = req.params.user_id;
  const updateData = req.body;

  if (!userId) {
    return res.status(400).send({ error: "User ID is required" });
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).send({ error: "No fields to update" });
  }

  updateUser(userId, updateData)
    .then((upDatedUser) => {
      res.status(200).send({ upDatedUser: upDatedUser });
    })
    .catch((err) => {
      console.log("ER", err);
      next(err);
    });
}

export function removeUser(req, res, next) {
  const userId = req.params.user_id;

  if (!userId) {
    return res.status(400).send({ error: "User ID is required" });
  }
  deleteUser(userId)
    .then((deletedUser) => {
      res.status(200).send({ deletedUser: deletedUser });
    })
    .catch((err) => {
      console.log("ER", err);
      next(err);
    });
}
