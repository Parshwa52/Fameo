import express from "express";
import cors from "cors";
import config from "./config.js";
import jobController from "./controller/jobController.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", jobController);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`)
);
