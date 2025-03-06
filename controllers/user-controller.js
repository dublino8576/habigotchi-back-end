import { fetchUsers } from "../models/user-model";

export function getUsers(req, res, next) {
  return fetchUsers()
    .then((allUsers) => {
      res.status(200).send({ allUsers: allUsers });
    })
    .catch((err) => {
      next(err);
    });
}
