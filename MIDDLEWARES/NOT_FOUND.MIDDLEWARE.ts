import { NextFunction, Request, Response } from "express";
import APIRESPONSE from "../HELPERS/APIRESPONSE.HELPER";
import { ResponseMapping } from "../UTILS/RESPONSE_MAPPING.UTILS";

export const NotFoundRouteHandler = (Request: Request, Response: Response, Next: NextFunction) => {
    const error = new Error(`Not Found : ${Request.originalUrl}`);
    // Response.status(404);
    APIRESPONSE(Response, ResponseMapping.NOT_FOUND.SERVER, {
      data: error.message,
      results: 0,
      status: ResponseMapping.NOT_FOUND.MESSAGE
    })
    // Next(error);
  };