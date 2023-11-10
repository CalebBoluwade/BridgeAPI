import { createClient } from "redis";
import { Env } from "./ENV.CONFIG";

export const RedisClient = createClient({
  url: Env("REDIS_RESOURCE"),
});
