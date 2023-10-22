import express from "express";

import { getJobs, postJob } from "../service/jobService.js";

const router = express.Router();

router.get("/jobs", getJobs);

router.post("/postJob", postJob);

export default router;
