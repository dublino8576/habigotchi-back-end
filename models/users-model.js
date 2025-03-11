import { response } from "express";
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

export function fetchUserByUserId(user_id) {
  let SQLString = `SELECT * FROM users WHERE user_id = $1;`;
  return db.query(SQLString, [user_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ msg: "User not found", status: 404 });
    } else {
      return rows[0];
    }
  });
}
export function deleteUser(user_id) {
  return db
    .query(`DELETE FROM categories WHERE user_id = $1;`, [user_id])
    .then((response) => {
    return db.query(`DELETE FROM habits WHERE user_id = $1;`, [user_id])
    })
    .then((response) => {
      return db
        .query(`DELETE FROM users WHERE user_id = $1 returning *;`, [user_id])
        .then(({ rows }) => {
          if (rows.length === 0) {
            return Promise.reject({ msg: "User not found", status: 404 });
          } else {
            return rows[0];
          }
        });
    });
}
export function updateUser(userId, updateData) {
  const {
    user_onboarded,
    habits_tracked,
    coins_earned,
    coins_spent,
    highest_streak,
    bought_apple,
    bought_ball,
    bought_strawberry,
    bought_ice_cream,
    pet_id,
  } = updateData;

  let propertiesToUpdate = [];
  let index = 1;
  const values = [];
  let SQL = `UPDATE users SET `;

  if (user_onboarded !== null || user_onboarded !== undefined) {
    propertiesToUpdate.push(`user_onboarded = $${index++}`);
    values.push(user_onboarded);
  }

  if (habits_tracked) {
    propertiesToUpdate.push(`habits_tracked = $${index++}`);
    values.push(habits_tracked);
  }

  if (coins_earned) {
    propertiesToUpdate.push(`coins_earned = $${index++}`);
    values.push(coins_earned);
  }

  if (coins_spent) {
    propertiesToUpdate.push(`coins_spent = $${index++}`);
    values.push(coins_spent);
  }
  if (highest_streak) {
    propertiesToUpdate.push(`highest_streak = $${index++}`);
    values.push(highest_streak);
  }
  if (bought_apple) {
    propertiesToUpdate.push(`bought_apple = $${index++}`);
    values.push(bought_apple);
  }
  if (bought_ball) {
    propertiesToUpdate.push(`bought_ball = $${index++}`);
    values.push(bought_ball);
  }
  if (bought_strawberry) {
    propertiesToUpdate.push(`bought_strawberry = $${index++}`);
    values.push(bought_strawberry);
  }

  if (bought_ice_cream) {
    propertiesToUpdate.push(`bought_ice_cream = $${index++}`);
    values.push(bought_ice_cream);
  }
  if (pet_id) {
    propertiesToUpdate.push(`pet_id = $${index++}`);
    values.push(pet_id);
  }

  values.push(userId);

  SQL += propertiesToUpdate.join(", ");
  SQL += ` WHERE user_id = $${index++} RETURNING *`;

  return db.query(SQL, values).then((response) => {
    return response.rows;
  });
}
