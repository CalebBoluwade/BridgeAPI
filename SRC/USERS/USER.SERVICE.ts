import { Request, Response } from "express";
import { Pool, QueryResult } from "pg";
import { CreateUserRequest } from "./SCHEMA.USER";
import { userService } from "./CONTROLLER.USER";
// import User from "./MODEL.AUTH";
import { ResponseSchema } from "../../SCHEMAS/RESPONSE.SCHEMA";
import APIRESPONSE from "../../HELPERS/APIRESPONSE.HELPER";
import { ResponseMapping } from "../../UTILS/RESPONSE_MAPPING.UTILS";

export const User_RegisterController = async (
  Request: Request<{}, {}, CreateUserRequest>,
  Response: Response<ResponseSchema>
) => {
  // if (Request.body.userType === "Customer") {
  // }

  const params = {
    Bucket: 'your-bucket-name',
    Key: `uploads/${Request.file!.originalname}`, // S3 file path
    Body: Request.file!.buffer, // File content
  };

  const DatabaseClient: Pool = (Request as any).DatabaseClient;
  const Auth = new userService(DatabaseClient);
  // console.log(Request.body);

  const createdUser = await Auth.CreateNewUser(Request.body);
  // console.log(createdUser);

    APIRESPONSE(Response, createdUser.statusCode, {
      data: createdUser.data,
      results: createdUser.results,
      status: createdUser.status,
    });
  
};

// export const Auth_LoginController = async (
//   Request: Request<{}, {}, ValidateLoginRequest>,
//   Response: Response<ResponseSchema>
// ) => {
  // encodeURIComponent("")
//   const Auth = new Userservice();
//   const { email, phoneNumber, password } = Request.body;

//   const authUser = await Auth.LoginUser(email! ?? phoneNumber, password);

//   if (authUser?.isValid) {
//     APIRESPONSE(Response, authUser.code, {
//       data: authUser.data,
//       results: 1,
//       status: authUser.message,
//     });
//   }

//   if (authUser?.error) {
//     APIRESPONSE(Response, authUser.code, {
//       data: null,
//       results: 0,
//       status: authUser!.error.message,
//     });
//   }

//   if (!authUser?.isValid) {
//     APIRESPONSE(Response, authUser!.code, {
//       data: null,
//       results: 0,
//       status: authUser!.message,
//     });
//   }
// };

// export const Auth_DeleteController = async (
//   Request: Request<{}, {}, {}>,
//   Response: Response<ResponseSchema>
// ) => {
//   const { id } = (Request as any).User;
//   const Auth = new Userservice();

//   const deletedUser = await Auth.DeleteUser(id);

//   if (deletedUser){
//     APIRESPONSE(Response, 200, {
//       data: null,
//       results: 1, 
//       status: ResponseMapping.SUCCESSFUL.MESSAGE
//     })
//   }
// };
