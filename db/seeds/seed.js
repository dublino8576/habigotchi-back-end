import format from "pg-format";
import db from "../connection.js";

const seed = ({ category_data, habit_data, pet_data, user_data }) => {
  return db
    .query(`DROP TABLE IF EXISTS habits;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS pets;`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE pets (
    pet_id SERIAL PRIMARY KEY,
    pet_name VARCHAR NOT NULL,
    pet_health INT NOT NULL,
    pet_happiness INT NOT NULL,
    pet_status VARCHAR ,
    current_coin INT DEFAULT 100 NOT NULL,
    pet_birthday TIMESTAMP DEFAULT NOW());
    `);
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
      return db.query(`
      CREATE TABLE habits (
       habit_id SERIAL PRIMARY KEY,
      habit_name VARCHAR NOT NULL,
      habit_frequency VARCHAR,
      habit_status VARCHAR,
      habit_added TIMESTAMP DEFAULT NOW(),
      habit_category VARCHAR NOT NULL,
      user_id INT REFERENCES users(user_id)

      );`);
    })

    .then(() => {
      return db.query(`
        CREATE TABLE categories (
        category_id SERIAL PRIMARY KEY,
        category_name VARCHAR,
        user_id INT REFERENCES users(user_id)
        );`);
    })
    .then(() => {
      const insertPetsQueryStr = format(
        `INSERT INTO pets (pet_name, pet_health, pet_happiness) VALUES %L;`,
        pet_data.map(({ pet_name, pet_health, pet_happiness }) => [
          pet_name,
          pet_health,
          pet_happiness,
        ])
      );
      return db.query(insertPetsQueryStr);
    })
    .then(() => {
      const insertUsersQueryStr = format(
        `INSERT INTO users (user_name, pet_id) VALUES %L;`,

        user_data.map(({ user_name, pet_id }) => [user_name, pet_id])
      );
      return db.query(insertUsersQueryStr);
    })
    .then(() => {
      const insertCategoriesQueryStr = format(
        `INSERT INTO categories (category_name,user_id) VALUES %L;`,
        category_data.map(({ category_name, user_id }) => [
          category_name,
          user_id,
        ])
      );
      return db.query(insertCategoriesQueryStr);
    })
    .then(() => {
      const insertHabitsQueryStr = format(
        `INSERT INTO habits (habit_name, habit_frequency, habit_status,habit_category, user_id) VALUES %L;`,
        habit_data.map(
          ({
            habit_name,
            habit_frequency,
            habit_status,
            habit_category,
            user_id,
          }) => [
            habit_name,
            habit_frequency,
            habit_status,
            habit_category,
            user_id,
          ]
        )
      );
      return db.query(insertHabitsQueryStr);
    });
};

export default seed;
