import { Router } from "express";
import { OpenApi, Types, textPlain } from "ts-openapi";
import multer from "multer";
const storage = multer.memoryStorage();
import { ValidateAPIRequest } from "../../MIDDLEWARES/VALIDATE_REQUEST.MIDDLEWARE";

const upload = multer({ storage });
export const TenantSwaggerDocs = (openApiInstance: OpenApi, API: Router, ValidateAPIUser: any) => {
  API.post(
    "/tenant/outlets/create",
    // ValidateAPIRequest(UserEmailAuthSchema),
    () => {}
  );

  //   API.post(
  //     "/tenant/outlets/view",
  //     ValidateAPIRequest(createUserSchema),
  //     upload.single('file'),
  //     User_RegisterController
  //   );
  openApiInstance.addPath(
    "/tenants/outlets/view",
    {
      get: {
        description: "Retrieves All available Outlets API",
        summary: "Retrieves All available Outlets API", // Method summary
        operationId: "tenant_view",
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
        //       phoneNumber: Types.String({
        //         description: "User's Phone Number",
        //         maxLength: 25,
        //         required: true,
        //         minLength: 8,
        //       }),
        //       interests: Types.Array({
        //         arrayType: Types.String(),
        //         description: "User's Shopping Interests",
        //         maxLength: 3,
        //         required: true,
        //       }),
        //       userType: Types.String({
        //         description: "User's Password",
        //         maxLength: 25,
        //         required: true,
        //         minLength: 8,
        //       }),
        //     },
        //     modelName: "Register",
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
          200: {
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
        tags: ["Tenant"],
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

  openApiInstance.addPath(
    "/tenant/outlets/bid/:bidID/:action",
    {
      post: {
        description: "Perform tenant's Action Outlets API",
        summary: "Perform tenant's Action Outlets API", // Method summary
        operationId: "tenant_action",
        requestSchema: {
          headers: {
            // Authorization: "string"
          },
          params: {
            bidID: Types.String({
                required: true,
                description: ""
            }),
            action: Types.StringEnum({
              values: ["accept", "decline", "new"],
              required: true,
              description: "tenant's Action on bid",
            }),
          },
        },
        responses: {
          // here we declare the response types
          200: {
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
        tags: ["Tenant"],
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
};
