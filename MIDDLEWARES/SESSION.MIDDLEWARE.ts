import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
// import ip from "ip";
import { UTILS } from "../UTILS/INDEX.UTILS";
import { JwtPayload } from "jsonwebtoken";
import API_RESPONSE from "../HELPERS/APIRESPONSE.HELPER";

interface JWTResponse {
  valid: boolean;
  expired: boolean;
  decoded: string | JwtPayload | null;
}

const ValidateAPIUser =
  (VerifyUser: (token: string, type: "access" | "refresh") => JWTResponse) =>
  (Request: Request, Response: Response, next: NextFunction): void => {
    const start = Date.now();
    try {
      const accessToken = get(Request, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
      );
      const user = VerifyUser(accessToken, "access");
      // console.log(Request.body)

      // const remoteIP = ip.address();

      UTILS.Logger.info(
        {
          // ip: remoteIP || Request.ip,
          path: Request.baseUrl + Request.url,
          data:
            Object.keys(Request.body).length !== 0
              ? Request.body
              : Object.keys(Request.query).length !== 0
              ? Request.query
              : Request.params,
        },
        user.valid
          ? "Request Accepted"
          : accessToken
          ? "Request Denied. Expired / Invalid Token"
          : "Request Denied.. No Token Provided"
      );

      if (!user.valid) {
        return API_RESPONSE(Response, 401, {
          data: null,
          results: 0,
          status: accessToken ? "Expired / Invalid Token" : "No Token Provided",
        });
      }

      if (
        !JSON.parse(process.env.AllowedSources!)?.includes(Request.body?.Source)
      ) {
        return API_RESPONSE(Response, 400, {
          status: "Invalid Source",
          data: null,
          results: 0,
        });
      }

      if (
        user.valid &&
        JSON.parse(process.env.AllowedSources!)?.includes(Request.body?.Source)
      ) {
        (Request as any).User = user.decoded;
        // UTILS.Logger.info(
        //   Request.baseUrl + Request.url,
        //   "Request Accepted. Endpoint:",
        // );

        Response.on("finish", (...data: any) => {
          // console.log(data);
          const duration = Date.now() - start;

          Response.locals.requestCount = 0;
          Response.locals.errorCount = 0;
          Response.locals.errorRate = 0;

          Response.locals.requestCount++;
          if (Response.statusCode < 400) {
            Response.locals.requestCount++;
          }

          const requestCount = Response.locals.requestCount;
          const errorRate = Response.locals.errorRate;
          Response.locals.request = { duration, requestCount, errorRate };
          // console.log(res.locals);
        });

        // console.log(Response.locals);
        return next();
      }
    } catch (error: any) {
      UTILS.Logger.error([error], error.message);
      return API_RESPONSE(Response, 400, {
        data: null,
        results: 0,
        status: "Unable To Verify"
      });
    }

    // console.log(accessToken);
    // if (accessToken) {
    //     next();
    // httpCode: error.httpCode;
    // }
  };

export default ValidateAPIUser;
