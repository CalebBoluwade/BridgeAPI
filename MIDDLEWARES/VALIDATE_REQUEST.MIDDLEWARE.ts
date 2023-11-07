// import dayjs from "dayjs";
import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError, z } from "zod";
import { ResponseSchema } from "../SCHEMAS/RESPONSE.SCHEMA";
import API_RESPONSE from "../HELPERS/APIRESPONSE.HELPER";
import { ResponseMapping } from "../UTILS/RESPONSE_MAPPING.UTILS";
import { UTILS } from "../UTILS/INDEX.UTILS";

export const ValidateAPIRequest =
  (schema: AnyZodObject) =>
  (
    Request: Request,
    Response: Response<ResponseSchema>,
    next: NextFunction
  ) => {
    try {
      schema.parse({
        body: Request.body,
        query: Request.query,
        params: Request.params,
      });

      next();
    } catch (e: any) {
      UTILS.Logger.warn(e.issues);

      if (e instanceof ZodError) {
        // Handle validation error
        return API_RESPONSE(Response, ResponseMapping.INVALID_REQUEST.SERVER, {
          results: 0,
          data: process.env.NODE_ENV === "development" ? e.issues : null,
          status:
            ResponseMapping.INVALID_REQUEST.MESSAGE ??
            "Missing or Invalid parameters",
        });
      }
      // else {
      //     // Handle other errors
      //     res.status(500).json({ message: 'Internal Server Error' });
      // }

      return API_RESPONSE(Response, ResponseMapping.INVALID_REQUEST.SERVER, {
        results: 0,
        data: null,
        status: e.errors[0].message,
      });
    }
  };
