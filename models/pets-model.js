import db from "../db/connection.js";

export function fetchPet(user_name) {
  return db
    .query(
      `
        SELECT pets.*
        FROM users
        JOIN pets ON users.pet_id = pets.pet_id
        WHERE users.user_name = $1`,
      [user_name]
    )
    .then((result) => {
      return result.rows;
    });
}

export function createPets(pet_name, pet_status) {
  return db
    .query(
      `INSERT INTO pets (pet_name,pet_health,pet_happiness,pet_status)
        VALUES ($1,80,100,$2)
        RETURNING*`,
      [pet_name, pet_status]
    )
    .then((response) => {
      return response.rows[0];
    });
}

export function changePet(reqBody, user_name) {
  const { pet_name, pet_health, pet_happiness, current_coin, pet_status } =
    reqBody;

  let propertiesToUpdate = [];
  let index = 1;
  const values = [];
  let SQL = `UPDATE pets SET `;

  if (pet_name) {
    propertiesToUpdate.push(`pet_name = $${index++}`);
    values.push(pet_name);
  }

  if (pet_health) {
    propertiesToUpdate.push(`pet_health = $${index++}`);
    values.push(pet_health);
  }

  if (pet_happiness) {
    propertiesToUpdate.push(`pet_happiness = $${index++}`);
    values.push(pet_happiness);
  }

  if (current_coin) {
    propertiesToUpdate.push(`current_coin = $${index++}`);
    values.push(current_coin);
  }

  if (pet_status) {
    propertiesToUpdate.push(`pet_status = $${index++}`);
    values.push(pet_status);
  }

  values.push(user_name);

  SQL += propertiesToUpdate.join(", ");
  SQL += ` WHERE pet_id = (SELECT pet_id FROM users WHERE user_name = $${index++}) RETURNING *`;

  return db.query(SQL, values).then((result) => {
    return result.rows[0];
  });
}
