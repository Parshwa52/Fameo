import express from "express";

import {
  getJobs,
  postJob,
  registerCandidate,
  registerCompany,
  myAppliedJobs,
  myPostedJobs,
} from "../service/jobService.js";

const router = express.Router();

router.get("/jobs", getJobs);

router.post("/postJob", postJob);

router.post("/registerCandidate", registerCandidate);

router.post("/registerCompany", registerCompany);

router.get("/myAppliedJobs", myAppliedJobs);

router.get("/myPostedJobs", myPostedJobs);

export default router;
