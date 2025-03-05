import db from "../db/connection";
export function fetchCategories() {
  return db.query("SELECT * FROM categories").then((res) => {
    return res.rows;
  });
}
