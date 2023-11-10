import dotenv from "dotenv";
dotenv.config();
import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { PGpool } from "./CONFIG/DATABASE.CONFIG";
import compression from "compression";
// import responseTime from "response-time";
import cors from "cors";
// import ip from "ip";
import helmet from "helmet";
import { ResponseSchema } from "./SCHEMAS/RESPONSE.SCHEMA";
import { DatabaseMiddleware } from "./MIDDLEWARES/DATABASE.MIDDLEWARE";
import { RedisClient } from "./CONFIG/REDIS.CONFIG";
import API_RESPONSE from "./HELPERS/APIRESPONSE.HELPER";
import { Env } from "./CONFIG/ENV.CONFIG";
import { NotFoundRouteHandler } from "./MIDDLEWARES/NOT_FOUND.MIDDLEWARE";
// import ApplicationRouter, { Route } from "./ROUTES/INDEX.ROUTES";
import SwaggerUI from "swagger-ui-express";
import {
  APIRouter,
  // SwaggerJSON,
  openApiInstance,
} from "./HELPERS/SWAGGER.HELPER";
import { UTILS } from "./UTILS/INDEX.UTILS";
import { ResponseMapping } from "./UTILS/RESPONSE_MAPPING.UTILS";

// import rateLimit from "express-rate-limit";
// import slowDown from "express-slow-down";

export const BridgeAPI: Application = express();
// Rate Limiting

// const rateLimiter = rateLimit({
//   windowMs: 10 * 60 * 5000,
//   max: 35,
//   handler: (
//     Request: Request,
//     Response: Response<ResponseSchema>,
//     next: NextFunction
//   ) => {
//     // next();
//     return API_RESPONSE(Response, 429, {
//       status: "TOO MANY REQUESTS",
//       statusCode: 429,
//       results: 0,
//       data: null,
//     });
//   },
// });

// const slow = slowDown

// BridgeAPI.use(rateLimiter);
BridgeAPI.set("trust proxy", 1);
BridgeAPI.use(express.urlencoded({ extended: true, limit: "50kb" }));
BridgeAPI.use(express.json({ limit: "50kb" }));
BridgeAPI.use(
  compression({
    level: 8,
    threshold: 0,
  })
);
// BridgeAPI.use(responseTime());
BridgeAPI.use(DatabaseMiddleware);

BridgeAPI.use(helmet());
BridgeAPI.use(
  helmet.contentSecurityPolicy({
    // the following directives will be merged into the default helmet CSP policy
    directives: {
      defaultSrc: ["'self'"], // default value for all directives that are absent
      scriptSrc: ["'self'"], // helps prevent XSS attacks
      frameAncestors: ["'none'"], // helps prevent Clickjacking attacks
      // imgSrc: ["'self'", "'http://imgexample.com'"],
      // styleSrc: ["'self'"],
    },
  })
);
BridgeAPI.use(helmet.crossOriginEmbedderPolicy());
BridgeAPI.use(helmet.crossOriginOpenerPolicy());
BridgeAPI.use(helmet.crossOriginResourcePolicy());
BridgeAPI.use(helmet.dnsPrefetchControl());
BridgeAPI.use(helmet.frameguard());
BridgeAPI.use(helmet.hidePoweredBy());
BridgeAPI.use(
  helmet.hsts({
    maxAge: 123456,
    includeSubDomains: false,
  })
);
// BridgeAPI.use(helmet.expectCt());
BridgeAPI.use(helmet.ieNoOpen());
BridgeAPI.use(helmet.noSniff());
BridgeAPI.use(helmet.originAgentCluster());
BridgeAPI.use(helmet.permittedCrossDomainPolicies());
BridgeAPI.use(helmet.referrerPolicy());
BridgeAPI.use(helmet.xssFilter());

RedisClient.on("connect", () => {
  UTILS.Logger.info("Connected to Redis");
});

RedisClient.on("error", (error) => {
  UTILS.Logger.error(error, "Redis error");
  process.exitCode = 1;
});

const StartServer = async () => {
  UTILS.Logger.info("ENVIRONMENT >>>", process.env.NODE_ENV);

  try {
    await RedisClient.connect();
  } catch (error) {
    console.error(error);
    // process.exitCode = 1;
    process.exit(1);
  }

  // SendMessageQueue(queue, text);

  PGpool.connect((err) => {
    if (err) {
      UTILS.Logger.error(err, "Error connecting to database");
      process.exit(1);
    } else {
      UTILS.Logger.info("Connected to Postgres DB");
    }
  });
};

StartServer();

// RedisClient.set('')
// RedisClient.setEx('myKey', 'myValue', (err: Error | null, result: string | undefined) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Key saved successfully');
//   }
// });

// const remoteIP = ip.address();

BridgeAPI.use((req: Request, res: Response, next: NextFunction) => {
  const period = 60 * 5;

  if (req.method === "GET") {
    res.set("Cache-control", `public, max-age=${period}`);
  } else {
    res.set("Cache-control", "no-store");
  }
  next();
});

export const ErrorHandler: ErrorRequestHandler = async (
  error,
  Request,
  Response: Response<ResponseSchema>,
  Next
) => {
  try {
    // mail = errorMailer.sendMail({
    //     from: 'contact@neverforgetit.net',
    //     to: 'kuczak.tomasz@gmail.com',
    //     subject: 'REST API Error',
    //     text: 'There has been an error in the bookstore REST API',
    //     html: '<p>There has been an error in the bookstore REST API<p>'
    // })
    UTILS.Logger.error(`Message sent`);
    UTILS.Logger.error(error, error.message);
  } catch (e) {
    UTILS.Logger.error(e);
  }

  return API_RESPONSE(Response, ResponseMapping.SERVER_ERROR.SERVER, {
    status: "There was an internal server error. Please try again.",
    results: 0,
    data: null,
  });
  // Response.status(500).send("Internal Server Error");
  // Next();
};
// Define error-handling middleware

BridgeAPI.use("/BRIDGE/API/V1", APIRouter);
BridgeAPI.get("/", (req, res) => {
  res.send("API SAYS Hello World");
});
BridgeAPI.use(
  "/swagger",
  SwaggerUI.serve,
  SwaggerUI.setup(openApiInstance.generateJson(), {})
);
BridgeAPI.use(ErrorHandler);

// ApplicationRouter(BridgeAPI);

const BridgeAPI_SERVER = BridgeAPI.listen(Env("APP_PORT"), () => {
  UTILS.Logger.info("BRIDGE  SUCCESSFULLY STARTED...");
  console.info(`WRITING APPLICATION LOGS to ${__dirname}/LOGS/SERVER.LOG`);
});

// Graceful Shutdown
["SIGTERM"].forEach((signal) => {
  process.on(signal, async () => {
    console.log(PGpool.totalCount);
    await PGpool.end();
    console.log(PGpool.totalCount);
    // RedisClient.shutdown("SAVE");
    UTILS.Logger.warn("BRIDGE IS BEEN SHUT DOWN...");
    setTimeout(() => {
      UTILS.Logger.info("BRIDGE TERMINATED...");
      BridgeAPI_SERVER.close(() => {
        UTILS.Logger.info("BRIDGE HAS BEEN SHUT DOWN...");
      });

      process.exitCode = 1; // Terminate the application
    }, 5000);
  });
});

["SIGINT"].forEach((signal) => {
  process.on(signal, async () => {
    console.log(PGpool.totalCount);
    await PGpool.end();
    console.log(PGpool.totalCount);
    // RedisClient.shutdown("SAVE");
    UTILS.Logger.warn("BRIDGE IS BEEN SHUT DOWN...");
    setTimeout(() => {
      UTILS.Logger.info("BRIDGE TERMINATED...");
      BridgeAPI_SERVER.close(() => {
        UTILS.Logger.info("BRIDGE HAS BEEN SHUT DOWN...");
      });

      process.exitCode = 1; // Terminate the application
    }, 5000);
  });
});

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err: Error) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  BridgeAPI_SERVER.close(() => {
    process.exitCode = 1;
  });
});

BridgeAPI.use(NotFoundRouteHandler);
