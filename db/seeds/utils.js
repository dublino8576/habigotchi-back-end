import db from "../connection.js";

export function checkUserIdExist(user_id) {
  let SQL = `SELECT * FROM users 
  WHERE user_id = $1`;

  return db.query(SQL, [user_id]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        error: "Not found",
        detail: "User ID does not exist",
      });
    } else return "User ID Exists";
  });
}
