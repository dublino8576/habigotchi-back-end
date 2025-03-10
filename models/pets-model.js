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

export function changePet(new_name = null,new_health = null,new_happiness = null, user_name = null) {
  return db
  .query(`
  UPDATE pets
  SET 
  pet_name = COALESCE($1, pet_name),
  pet_health = COALESCE($2, pet_health),
  pet_happiness = COALESCE($3, pet_happiness)
  WHERE pet_id = (SELECT pet_id FROM users WHERE user_name = $4)
  RETURNING *`,
  [new_name,new_health,new_happiness,user_name])
}