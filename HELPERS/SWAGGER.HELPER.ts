import {
  OpenApi,
  OpenApiSchema,
  textPlain,
  basicAuth,
  bearerAuth,
  Joi,
  Types,
  apiKeyAuth,
} from "ts-openapi";
import { AuthSwaggerDocs } from "../SRC/USERS/SWAGGER.USER";

import { Router } from "express";

export const SwaggerJSON: OpenApiSchema = {
  // definition: {
  openapi: "3.0.3",
  info: {
    title: "BRIDGE API DOCS",
    description: "BRIDGE API",
    termsOfService: "",
    version: "1.0.0",
    contact: {
      email: "calebb.jnr@gmail.com",
    },
    license: {
      name: "MIT",
      url: "",
    },
  },
  paths: {},
  servers: [
    { url: `http://localhost:${process.env.PORT}` },
    { url: "https://prod-api:443" },
  ],
};

export const openApiInstance: OpenApi = new OpenApi(
  "3.0.3",
  "BRIDGE API DOCS",
  "REST APIs",
  "calebb.jnr@gmail.com"
);

openApiInstance.setServers([
  { url: "http://prod.api.com:443/api/v1" },
  { url: `http://localhost:${process.env.PORT}/api/v1` },
]);

// openApiInstance.declareSecurityScheme("JWT", {
//   in: "header",
//   name: "Authorization",
//   type: "apiKey",
// });
openApiInstance.declareSecurityScheme("bearerSecurity", bearerAuth());
// declare global schemes (applicable to all methods)
openApiInstance.addGlobalSecurityScheme("bearerSecurity");

// to receive a key name X-API-KEY (or other name) in header, cookie or query parameter
// openApiInstance.declareSecurityScheme(
//   "apiSecurity",
//   apiKeyAuth("X-API-KEY", "header")
// );

// openApiInstance.declareSecurityScheme()
export const APIRouter = Router();
AuthSwaggerDocs(openApiInstance, APIRouter);

export const APIResponse = Types.Object({
  properties: {
    message: Types.String({
      description: "Response message",
    }),
    code: Types.Integer({
      description: "number",
    }),
    // data: Types.Array({
    //   description: "",
    //   arrayType: "",
    // }),
  },
  example: { message: "Successful", code: 200 },
});

// set API license
openApiInstance.setLicense(
  "Apache License, Version 2.0", // API license name
  "http://www.apache.org/licenses/LICENSE-2.0", // API license url
  "http://dummy.io/terms/" // API terms of service
);
