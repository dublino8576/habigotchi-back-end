import format from "pg-format";
import db from "../connection.js";
import {
  category_data,
  habit_data,
  pet_data,
  user_data,
} from "../data/dev-data";

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
      const categoriesTable = db.query(`
      CREATE TABLE categories (
      category_id SERIAL PRIMARY KEY
      category_name VARCHAR,
      );`);

      const habitsTable = db.query(`
      CREATE TABLE habits (
      habit_name VARCHAR,
      habit_id SERIAL PRIMARY KEY,
      habit_frequency VARCHAR,
      habit_status VARCHAR,
      category_id INT REFERENCES categories(category_id)
      )    
`)
const petsTable = db.query(`
    CREATE TABLE habits (
pet_id SERIAL PRIMARY KEY,
pet_name VARCHAR,
pet_health INT,
pet_happiness INT
    )    
`)
      const usersTable = db.query(`
      CREATE TABLE users (
        user_id VARCHAR PRIMARY KEY,
        user_name VARCHAR NOT NULL,
        current_coin INT,
        pet_id INT REFERENCES pets(pet_id)
      );`);

      return Promise.all([topicsTablePromise, usersTablePromise]);
    });
};
