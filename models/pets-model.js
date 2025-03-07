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
        VALUES ($1,100,100,$2)
        RETURNING*`,
      [pet_name, pet_status]
    )
    .then((response) => {
      return response.rows[0];
    });
}
