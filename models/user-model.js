import db from "../db/connection";
export function fetchUsers() {
  return db.query("SELECT * FROM users").then((res) => {
    return res.rows;
  });
}
