import { coerce, z, string } from "zod";

const ENV = {
  IV:"IV",
  secretKey: "secretKey",
  PUBLIC_KEY_JWT: "PUBLIC_KEY_JWT",
  PUBLIC_KEY_PWD: "PUBLIC_KEY_PWD",
  APP_PORT: "APP_PORT",
  REDIS_RESOURCE: "REDIS_RESOURCE",
  POSTGRES_USER: "POSTGRES_USER",
  POSTGRES_PASSWORD: "POSTGRES_PASSWORD",
  POSTGRES_HOST: "POSTGRES_HOST",
  POSTGRES_PORT: "POSTGRES_PORT",
  POSTGRES_BASE: "POSTGRES_BASE",
  POSTGRES_APPID: "POSTGRES_APPID",
  JWT_TIMEOUT: "JWT_TIMEOUT"
} as const;

const ENVConfig = {
  IV: string(),
  secretKey: string(),
  [ENV.PUBLIC_KEY_JWT]: string(),
  [ENV.JWT_TIMEOUT]: string(),
  [ENV.PUBLIC_KEY_PWD]: string(),
  [ENV.APP_PORT]: coerce.number(),
  [ENV.REDIS_RESOURCE]: string(),
  [ENV.POSTGRES_USER]: string(),
  [ENV.POSTGRES_PASSWORD]: string(),
  [ENV.POSTGRES_HOST]: string(),
  [ENV.POSTGRES_PORT]: coerce.number(),
  [ENV.POSTGRES_BASE]: string(),
  [ENV.POSTGRES_APPID]: string(),
} as const;

type ENVEnvType = (typeof ENV)[keyof typeof ENV];

export function Env<
  TData extends ENVEnvType,
  TRes = z.infer<(typeof ENVConfig)[TData]>
>(val: TData) {
  return ENVConfig[val].parse(process.env[val]) as TRes;
}
