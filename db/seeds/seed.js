import format from "pg-format";
import db from "../connection.js";

const seed = ({ category_data, habit_data, pet_data, user_data }) => {
  return db
    .query(`DROP TABLE IF EXISTS users;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS pets;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS habits;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      const categoriesTablePromise = db.query(`
      CREATE TABLE categories (
      category_id SERIAL PRIMARY KEY,
      category_name VARCHAR
      );`);
      const petsTablePromise = db.query(`
        CREATE TABLE pets (
    pet_id SERIAL PRIMARY KEY,
    pet_name VARCHAR NOT NULL,
    pet_health INT NOT NULL,
    pet_happiness INT NOT NULL,
    pet_status VARCHAR ,
    current_coin INT,
    pet_birthday TIMESTAMP DEFAULT NOW()

        );    
    `);
      return Promise.all([categoriesTablePromise, petsTablePromise]);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE habits (
         habit_id SERIAL PRIMARY KEY,
        habit_name VARCHAR NOT NULL,
        habit_frequency VARCHAR,
        habit_status VARCHAR,
        category_id INT REFERENCES categories(category_id)
        );`);
    })

    .then(() => {
      return db.query(`
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          user_name VARCHAR NOT NULL,
          habits_tracked INT DEFAULT 0 NOT NULL,
          user_onboarded BOOLEAN DEFAULT FALSE NOT NULL,
          coins_earned INT DEFAULT 0 NOT NULL,
          coins_spent INT DEFAULT 0 NOT NULL,
          highest_streak INT DEFAULT 0 NOT NULL,
          bought_apple INT DEFAULT 0 NOT NULL,
          bought_strawberry INT DEFAULT 0 NOT NULL,
          bought_ice_cream INT DEFAULT 0 NOT NULL,
          bought_ball INT DEFAULT 0 NOT NULL,
          pet_id INT REFERENCES pets(pet_id)

        );`);
    })
    .then(() => {
      const insertCategoriesQueryStr = format(
        `INSERT INTO categories (category_name) VALUES %L;`,
        category_data.map(({ category_name }) => [category_name])
      );
      const categoriesPromise = db.query(insertCategoriesQueryStr);

      const insertPetsQueryStr = format(
        `INSERT INTO pets (pet_name, pet_health, pet_happiness) VALUES %L;`,
        pet_data.map(({ pet_name, pet_health, pet_happiness }) => [
          pet_name,
          pet_health,
          pet_happiness,
        ])
      );
      const petsPromise = db.query(insertPetsQueryStr);

      return Promise.all([categoriesPromise, petsPromise]);
    })
    .then(() => {
      const insertHabitsQueryStr = format(
        `INSERT INTO habits (habit_name, habit_frequency, habit_status, category_id) VALUES %L;`,
        habit_data.map(
          ({ habit_name, habit_frequency, habit_status, category_id }) => [
            habit_name,
            habit_frequency,
            habit_status,
            category_id,
          ]
        )
      );
      return db.query(insertHabitsQueryStr);
    })
    .then(() => {
      const insertUsersQueryStr = format(
        `INSERT INTO users (user_name, pet_id) VALUES %L;`,

        user_data.map(({ user_name, pet_id }) => [user_name, pet_id])
      );
      return db.query(insertUsersQueryStr);
    });
};

export default seed;
