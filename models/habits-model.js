import db from "../db/connection.js";
import { checkUserIdExist, checkHabitIdExists } from "../db/seeds/utils.js";

export function createHabit(reqBody, user_id) {
  const { habit_name, habit_frequency, habit_status, habit_category } = reqBody;
  const args = [
    habit_name,
    habit_frequency,
    habit_status,
    user_id,
    habit_category,
  ];

  let SQL = `INSERT INTO habits (habit_name,habit_frequency,habit_status,user_id,habit_category)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING*`;

  return checkUserIdExist(user_id).then(() => {
    return db.query(SQL, args).then((response) => {
      return response.rows[0];
    });
  });
}

export function fetchUserHabits(user_id) {
  let SQL = `SELECT * from habits WHERE user_id = $1`;

  return checkUserIdExist(user_id).then(() => {
    return db.query(SQL, [user_id]).then((response) => {
      return response.rows;
    });
  });
}

export function deleteHabit(habit_id) {
  let SQL = `DELETE from habits WHERE habit_id = $1 RETURNING *`;

  return checkHabitIdExists(habit_id).then(() => {
    return db.query(SQL, [habit_id]).then((response) => {
      return response.rows;
    });
  });
}
