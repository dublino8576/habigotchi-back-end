import db from "../db/connection.js";

export function createUser(reqBody) {
  const { user_name } = reqBody;

  let SQL = `INSERT INTO users (user_name) VALUES ($1) RETURNING *`;

  return db.query(SQL, [user_name]).then((res) => {
    return res.rows;
  });
}

export function fetchUsers() {
  return db.query("SELECT * FROM users").then((res) => {

    return res.rows;
  });
}

