import { Response } from "express";
import { ResponseSchema } from "../SCHEMAS/RESPONSE.SCHEMA";
import { UTILS } from "../UTILS/INDEX.UTILS";

const API_RESPONSE = (
  Response: Response<ResponseSchema>,
  ResponseData: ResponseSchema
) => {
  Response.status(ResponseData.statusCode).send(ResponseData);

  return;
};

export default API_RESPONSE;
