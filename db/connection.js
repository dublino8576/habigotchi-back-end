import pg from "pg";
import env from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
const { Pool } = pg;

const _fileName = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_fileName);

const pool = new Pool();
const ENV = process.env.NODE_ENV || "development";

env.config({
  path: path.join(_dirname, `../.env.${ENV}`),
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

export default new Pool(config);
