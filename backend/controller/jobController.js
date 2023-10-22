import express from "express";

import { getJobs } from "../service/jobService.js";

const router = express.Router();

router.get("/jobs", getJobs);

export default router;
