import db from "../db/connection.js";
export function fetchCategories() {
  return db.query("SELECT * FROM categories").then((res) => {
    return res.rows;
  });
}
