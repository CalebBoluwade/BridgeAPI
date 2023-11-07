import { Response } from "express";
import { ResponseSchema } from "../SCHEMAS/RESPONSE.SCHEMA";

const APIRESPONSE = (
  Response: Response<ResponseSchema>,
  statusCode: number,
  ResponseData: Omit<ResponseSchema, "statusCode">
) => {
  Response.status(statusCode).send(ResponseData);

  return;
};

export default APIRESPONSE;
