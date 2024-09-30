import dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import https from "https";
import chalk from "chalk";
import './config/globals.js';
import ResponseHandler from "./helper/responseHandler.js";
import appRoutes from "./routes/index.js";

// --------------------------    CONFIG    -------------------------
const HTTP = process.env.ENVIRONMENT == "production" ? https : http;
const PORT = process.env.PORT || 8022;
const app = express();
const server = HTTP.createServer(app);

// --------------------      GLOBAL MIDDLEWARE   -------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ----------------------    RESPONSE HANDLER    -------------------
app.use((req, res, next) => {
  res.handler = new ResponseHandler(req, res);
  next();
})

// --------------------------    ROUTES    ------------------
app.use("/api", appRoutes);

// --------------------    GLOBAL ERROR HANDLER    ------------------
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.handler.serverError(err);
});

// ------------------------    START SERVER    ---------------------
server.listen(PORT, () => {
  console.log(
    chalk.bold.cyanBright(
      `\nServer started on ${chalk.white.bold(PORT)} :) \n`
    )
  );
});