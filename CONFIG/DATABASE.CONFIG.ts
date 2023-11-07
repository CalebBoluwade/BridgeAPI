import { Pool } from "pg";

export const PGpool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_BASE,
  idleTimeoutMillis: 30000,
  application_name: process.env.POSTGRES_APPID,
  query_timeout: 30000,
});
