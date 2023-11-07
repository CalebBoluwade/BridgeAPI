// express-promise-router
import express, { Application } from "express";
import userRouter from "../SRC/USERS/USER.ROUTES";
import HealthCheck from "../UTILS/HEALTHCHECK.UTIL";
// import { initOpenApi } from "../HELPERS/OpenAPI.HELPER";
import ValidateAPIUser from "../MIDDLEWARES/SESSION.MIDDLEWARE";
import { UTILS } from "../UTILS/INDEX.UTILS";

export const Route = express.Router();

const ApplicationRouter = (Application: Application) => {
  // SWAGGER DOCS
  // initOpenApi(Application);

  Route.get("/health", ValidateAPIUser(UTILS.verifyJWT), HealthCheck);

  // userRouter(Route, ValidateAPIUser(UTILS.verifyJWT));
};

export default ApplicationRouter;
