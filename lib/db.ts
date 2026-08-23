import { Pool } from "pg";
import { config } from "dotenv";
config({ path: ".env.local" });

export const pool = new Pool({
  host: process.env.LORE_DB_HOST,
  port: Number(process.env.LORE_DB_PORT),
  database: process.env.LORE_DB_NAME,
  user: process.env.LORE_DB_USER,
  password: process.env.LORE_DB_PASS,
});
