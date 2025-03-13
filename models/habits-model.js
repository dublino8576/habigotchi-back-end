import db from "../db/connection.js";
import { checkUserIdExist, checkHabitIdExists } from "../db/seeds/utils.js";

export function createHabit(reqBody, user_id) {
  const {
    habit_name,
    habit_frequency,
    habit_status,
    habit_category,
    habit_description,
    habit_frequency_times,
  } = reqBody;
  const args = [
    habit_name,
    habit_frequency,
    habit_status,
    user_id,
    habit_category,
    habit_description,
    habit_frequency_times,
  ];

  let SQL = `INSERT INTO habits (habit_name,habit_frequency,habit_status,user_id,habit_category,habit_description,habit_frequency_times)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING*`;

  return checkUserIdExist(user_id).then(() => {
    return db.query(SQL, args).then((response) => {
      return response.rows[0];
    });
  });
}

export function fetchUserHabits(user_id) {
  let SQL = `SELECT * from habits WHERE user_id = $1 ORDER BY habit_status DESC`;

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

export function editHabit(habit_id, reqBody) {
  const {
    habit_name,
    habit_frequency,
    habit_status,
    habit_category,
    habit_description,
    habit_frequency_times,
  } = reqBody;
  let updateProperties = [];
  const args = [];
  let index = 1;

  let SQL = `UPDATE habits SET `;

  if (habit_name) {
    updateProperties.push(`habit_name = $${index++}`);
    args.push(habit_name);
  }
  if (habit_status) {
    updateProperties.push(`habit_status = $${index++}`);
    args.push(habit_status);
  }
  if (habit_frequency) {
    updateProperties.push(`habit_frequency = $${index++}`);
    args.push(habit_frequency);
  }
  if (habit_category) {
    updateProperties.push(`habit_category = $${index++}`);
    args.push(habit_category);
  }

  if (habit_description) {
    updateProperties.push(`habit_description = $${index++}`);
    args.push(habit_description);
  }

  if (habit_frequency_times) {
    updateProperties.push(`habit_frequency_times = $${index++}`);
    args.push(habit_frequency_times);
  }

  args.push(habit_id);
  SQL += updateProperties.join(", ");
  SQL += ` WHERE habit_id = $${index++}
             RETURNING *`;

  return checkHabitIdExists(habit_id).then(() => {
    return db.query(SQL, args).then((response) => {
      return response.rows[0];
    });
  });
}
