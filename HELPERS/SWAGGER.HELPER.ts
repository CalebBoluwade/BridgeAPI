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
import { Router } from "express";
import ValidateAPIUser from "../MIDDLEWARES/SESSION.MIDDLEWARE";
import { UTILS } from "../UTILS/INDEX.UTILS";
import HealthCheck from "../UTILS/HEALTHCHECK.UTIL";
import { Env } from "../CONFIG/ENV.CONFIG";
import { LandlordSwaggerDocs } from "../SRC/LANDLORD/LANDLORD.ROUTES";
import { UserSwaggerDocs } from "../SRC/USERS/USER.ROUTES";
import { TenantSwaggerDocs } from "../SRC/TENANT/TENANT.ROUTES";

const BaseURL = `http://localhost:${Env("APP_PORT")}/BRIDGE/api/v1`

// export const SwaggerJSON: OpenApiSchema = {
//   // definition: {
//   openapi: "3.0.3",
//   info: {
//     title: "BRIDGE API DOCS",
//     description: "BRIDGE API",
//     termsOfService: "",
//     version: "1.0.0",
//     contact: {
//       email: "calebb.jnr@gmail.com",
//     },
//     license: {
//       name: "MIT",
//       url: "",
//     },
//   },
//   paths: {},
//   servers: [
//     { url: BaseURL },
//     { url: "https://prod-api:443" },
//   ],
// };

export const openApiInstance: OpenApi = new OpenApi(
  "3.0.3",
  "BRIDGE v1 API DOCS",
  "REST APIs",
  "calebb.jnr@gmail.com"
);

openApiInstance.setServers([
  { url: BaseURL },
  // { url: "http://prodv2.api.com:443/api/v1" },
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
UserSwaggerDocs(openApiInstance, APIRouter, ValidateAPIUser(UTILS.verifyJWT));
TenantSwaggerDocs(openApiInstance, APIRouter, ValidateAPIUser(UTILS.verifyJWT))
LandlordSwaggerDocs(openApiInstance, APIRouter, ValidateAPIUser(UTILS.verifyJWT))

// APIRouter.get("/health", ValidateAPIUser(UTILS.verifyJWT), HealthCheck);
APIRouter.get("/health", HealthCheck);

openApiInstance.addPath(
  "/health",
  {
    get: {
      description: "",
      summary: "API Health Check", // Method summary
      operationId: "health",
      // requestSchema: {
      //   body: Types.Object({
      //     required: true,
      //     description: "Authentication using email and password",
      //     properties: {
      //       email: Types.Email({
      //         description: "User's Email",
      //         maxLength: 50,
      //         required: true,
      //       }),
      //       password: Types.Password({
      //         description: "User's Password",
      //         maxLength: 25,
      //         required: true,
      //         minLength: 8,
      //       }),
      //     },
      //     modelName: "Login",
      //     default: {
      //       email: "dad",
      //       password: "mom",
      //     },
      //     example: {
      //       email: "dad2",
      //       password: "mom",
      //     },
      //   }),
      // },
      responses: {
        // here we declare the response types
        200: textPlain("SUCCESSFUL"),
        401: textPlain("Unauthorized"),
        500: textPlain("Internal Server Error"),
        503: textPlain("Service Unavailable"),
      },
      tags: ["Health Check"],
      // "consumes": [
      //   "application/json"
      //   ],
      // "produces": [
      // "application/json"
      // ],
      security: [],
    },
  },
  true
);

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
