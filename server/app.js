/**
 * @file Main Express application
 * @author Hunter Ballew <hunter421@ksu.edu>
 * @exports app Express application
 */

import "@dotenvx/dotenvx/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import requestLogger from "./middlewares/request-logger.js";
import logger from "./configs/logger.js";
import openapi from "./configs/openapi.js";
import swaggerUi from "swagger-ui-express";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

var app = express();

app.use(helmet());
app.use(compression());
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(import.meta.dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

if (process.env.OPENAPI_VISIBLE === "true") {
  logger.warn("OpenAPI documentation visible!");
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(openapi, { explorer: true }),
  );
}

export default app;
