import { Router } from "express";
import { OpenApi, Types, textPlain } from "ts-openapi";
import multer from "multer";
const storage = multer.memoryStorage();
import { ValidateAPIRequest } from "../../MIDDLEWARES/VALIDATE_REQUEST.MIDDLEWARE";

const upload = multer({ storage });
export const LandlordSwaggerDocs = (openApiInstance: OpenApi, API: Router, ValidateAPIUser: any) => {
  API.post(
    "/landlord/outlets/create",
    // ValidateAPIRequest(UserEmailAuthSchema),
    () => {}
  );

  openApiInstance.addPath(
    "/landlord/outlets/create",
    {
      post: {
        description: "",
        summary: "Landlord Outlet Creation API",
        operationId: "landlord-create",
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
        tags: ["Landlord"],
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

  //   API.post(
  //     "/landlord/outlets/view",
  //     ValidateAPIRequest(createUserSchema),
  //     upload.single('file'),
  //     User_RegisterController
  //   );
  openApiInstance.addPath(
    "/landlord/outlets/view",
    {
      get: {
        description: "Retrieve Landlord's Outlets API",
        summary: "Retrieve Landlord's Outlets API", // Method summary
        operationId: "landlord_view",
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
        tags: ["Landlord"],
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
    "/landlord/outlets/delete/:id",
    {
      delete: {
        description: "Delete Outlets API",
        summary: "Delete Outlets API",
        operationId: "delete_outlet",
        requestSchema: {
          params: {
            id: Types.String({
              required: true,
              description: "",
            }),
          },
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
        tags: ["Landlord"],
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
    "/landlord/outlets/bid/:bidID/:action",
    {
      post: {
        description: "Perform Landlord's Action Outlets API",
        summary: "Perform Landlord's Action Outlets API", // Method summary
        operationId: "landlord_action",
        requestSchema: {
          headers: {
            // Authorization: "string"
          },
          params: {
            bidID: Types.String({
              required: true,
              description: "",
            }),
            action: Types.StringEnum({
              values: ["accept", "decline", "new"],
              required: true,
              description: "Landlord's Action on bid",
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
        tags: ["Landlord"],
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
