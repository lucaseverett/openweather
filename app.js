import express from "express";
import helmet from "helmet";
import { current } from "./routes/current/index.js";

const app = express()
  .use(helmet())
  .use("/current", current)
  .get("/", (req, res) => {
    res.status(200).send("OpenWeather API");
  });

export default app;
