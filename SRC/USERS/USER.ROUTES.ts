import { Router } from "express";
import { OpenApi, Types, textPlain } from "ts-openapi";
import multer from 'multer';
const storage = multer.memoryStorage(); // Store files in memory before uploading to S3
import {
  // Auth_LoginController,
  User_RegisterController,
} from "./USER.SERVICE";
import { ValidateAPIRequest } from "../../MIDDLEWARES/VALIDATE_REQUEST.MIDDLEWARE";
import { createUserSchema, UserEmailAuthSchema } from "./SCHEMA.USER";

const upload = multer({ storage });

export const UserSwaggerDocs = (openApiInstance: OpenApi, API: Router, ValidateAPIUser: any) => {
  API.post(
    "/Auth/user",
    ValidateAPIUser,
    ValidateAPIRequest(UserEmailAuthSchema),
    User_RegisterController
    );
  openApiInstance.addPath(
    "/Auth/user",
    {
      post: {
        description: "",
        summary: "User Authentication API", // Method summary
        operationId: "login",
        requestSchema: {
          body: Types.Object({
            required: true,
            description: "Authentication using email and password",
            properties: {
              email: Types.Email({
                description: "User's Email",
                maxLength: 50,
                required: true,
              }),
              password: Types.Password({
                description: "User's Password",
                maxLength: 25,
                required: true,
                minLength: 8,
              }),
            },
            modelName: "Login",
            default: {
              email: "dad",
              password: "mom",
            },
            example: {
              email: "dad2",
              password: "mom",
            },
          }),
        },
        responses: {
          // here we declare the response types
          // 200: openApiInstance.declareSchema("SUCCESSFUL", APIResponse),
          401: textPlain("User not Found"),
          500: textPlain("Internal Server Error"),
        },
        tags: ["Auth"],
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

  API.post(
    "/Auth/Register",
    ValidateAPIRequest(createUserSchema),
    upload.single('file'),
    User_RegisterController
  );
  openApiInstance.addPath(
    "/Auth/Register",
    {
      post: {
        description: "",
        summary: "User Authentication API", // Method summary
        operationId: "Register",
        requestSchema: {
          body: Types.Object({
            required: true,
            description: "Authentication using email and password",
            properties: {
              email: Types.Email({
                description: "User's Email",
                maxLength: 50,
                required: true,
              }),
              password: Types.Password({
                description: "User's Password",
                maxLength: 25,
                required: true,
                minLength: 8,
              }),
              phoneNumber: Types.String({
                description: "User's Phone Number",
                maxLength: 25,
                required: true,
                minLength: 8,
              }),
              interests: Types.Array({
                arrayType: Types.String(),
                description: "User's Shopping Interests",
                maxLength: 3,
                required: true,
              }),
              userType: Types.String({
                description: "User's Password",
                maxLength: 25,
                required: true,
                minLength: 8,
              }),
            },
            modelName: "Register",
            default: {
              email: "dad",
              password: "mom",
            },
            example: {
              email: "dad2",
              password: "mom",
            },
          }),
        },
        responses: {
          // here we declare the response types
          201: {
            description: "Response Object",
            schema: {
              type: "object",
              description: "",
              properties: {
                status: {
                  type: "string",
                },
                results: {
                  type: "number",
                },
                data: {
                  type: "object",
                  description: "",
                  properties: {},
                },
              },
              example: {
                status: "Created",
                results: 1,
                data: [],
              },
            },
            content: {
              ResponseSchema: {
                schema: {
                  type: "object",
                  description: "",
                  properties: {},
                },
              },
            },
          },
          401: textPlain("User not Found"),
          500: textPlain("Internal Server Error"),
        },
        tags: ["Auth"],
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

  openApiInstance.addPath(
    "/Auth/Forgot",
    {
      patch: {
        description: "",
        summary: "User Authentication API", // Method summary
        operationId: "ForgotPassword",
        
        responses: {
          // here we declare the response types
          201: {
            description: "Response Object",
            schema: {
              type: "object",
              description: "",
              properties: {
                status: {
                  type: "string",
                },
                results: {
                  type: "number",
                },
                data: {
                  type: "object",
                  description: "",
                  properties: {},
                },
              },
              example: {
                status: "Created",
                results: 1,
                data: [],
              },
            },
            content: {
              ResponseSchema: {
                schema: {
                  type: "object",
                  description: "",
                  properties: {},
                },
              },
            },
          },
          401: textPlain("User not Found"),
          500: textPlain("Internal Server Error"),
        },
        tags: ["Auth"],
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

  // API.post(
  //   "/Auth/DeleteAccount/:id",
  //   ValidateAPIRequest(AuthRequestShema),
  //   Auth_RegisterController
  // );
  // openApiInstance.addPath(
  //   "/Auth/DeleteAccount/:id",
  //   {
  //     delete: {
  //       description: "",
  //       summary: "User Authentication API", // Method summary
  //       operationId: "DeleteAccount",
  //       requestSchema: {
  //         headers: {
  //           // Authorization: "string"
  //         },
  //         params: {
  //           userId: Types.String({
  //             required: true,
  //             description: "Customer's ID"
  //           }),
  //         },
  //       },
  //       responses: {
  //         // here we declare the response types
  //         201: {
  //           description: "Response Object",
  //           schema: {
  //             type: "object",
  //             description: "",
  //             properties: {
  //               status: {
  //                 type: "string",
  //               },
  //               results: {
  //                 type: "number",
  //               },
  //               data: {
  //                 type: "object",
  //                 description: "",
  //                 properties: {},
  //               },
  //             },
  //             example: {
  //               status: "Created",
  //               results: 1,
  //               data: [],
  //             },
  //           },
  //           content: {
  //             ResponseSchema: {
  //               schema: {
  //                 type: "object",
  //                 description: "",
  //                 properties: {},
  //               },
  //             },
  //           },
  //         },
  //         401: textPlain("User not Found"),
  //         500: textPlain("Internal Server Error"),
  //       },
  //       tags: ["Auth"],
  //       // "consumes": [
  //       //   "application/json"
  //       //   ],
  //       // "produces": [
  //       // "application/json"
  //       // ],
  //       security: [{ bearerSecurity: [] }],
  //     },
  //   },
  //   true
  // );
};
