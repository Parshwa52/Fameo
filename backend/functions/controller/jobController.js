import express from "express";

import {
  getJobs,
  postJob,
  registerCandidate,
  registerCompany,
  myAppliedJobs,
  myPostedJobs,
  getJob,
  getCandidate,
  getCompany,
  applyJob,
  getJobApplicants,
  revertCandidate,
} from "../service/jobService.js";

const router = express.Router();

router.get("/jobs", getJobs);

router.post("/postJob", postJob);

router.post("/applyJob", applyJob);

router.post("/registerCandidate", registerCandidate);

router.post("/registerCompany", registerCompany);

router.post("/myAppliedJobs", myAppliedJobs);

router.post("/myPostedJobs", myPostedJobs);

router.post("/getJob", getJob);

router.post("/getCandidate", getCandidate);

router.post("/getCompany", getCompany);

router.post("/getJobApplicants", getJobApplicants);

router.post("/revertCandidate", revertCandidate);

export default router;
