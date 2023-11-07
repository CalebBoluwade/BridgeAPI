import { Pool } from "pg";
import { Env } from "./ENV.CONFIG";

export const PGpool = new Pool({
  user: Env("POSTGRES_USER"),
  password: Env("POSTGRES_PASS"),
  host: Env("POSTGRES_HOST"),
  port: Env("POSTGRES_PORT"),
  database: Env("POSTGRES_BASE"),
  idleTimeoutMillis: 30000,
  application_name: Env("POSTGRES_APPID"),
  query_timeout: 30000,
});
