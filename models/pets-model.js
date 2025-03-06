import db from "../db/connection.js";
export function createPets(pet_name, pet_status, current_coin) {
  return db
    .query(
      `INSERT INTO pets (pet_name,pet_health,pet_happiness,pet_status,current_coin)
        VALUES ($1,100,100,$2,$3)
        RETURNING*`,
      [pet_name, pet_status, current_coin]
    )
    .then((response) => {
      return response.rows[0];
    });
}
