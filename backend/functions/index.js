/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import functions from "firebase-functions";
import logger from "firebase-functions/logger";

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

export default functions.https.onRequest(app);
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
