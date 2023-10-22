import db from "../firestore.js";
import Job from "../model/jobModel.js";
import { v4 as uuidv4 } from "uuid";

export const getJobs = async (req, res, next) => {
  try {
    const jobs = await db.collection("Jobs").get();
    const jobArray = [];
    jobs.forEach((doc) => {
      const job = new Job(
        doc.data().jobId,
        doc.data().jobTitle,
        doc.data().jobType,
        doc.data().jobRole,
        doc.data().jobResponsibilities,
        doc.data().jobRequirements,
        doc.data().jobBenefits,
        doc.data().jobSalary,
        doc.data().jobLocation,
        doc.data().jobPrivacyPolicy,
        doc.data().companyName,
        doc.data().companyTagLine,
        doc.data().companyDescription
      );
      jobArray.push(job);
    });
    res.status(200).send(jobArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const postJob = async (req, res, next) => {
  try {
    var jobData = await req.body.jobData;
    var jobId = await uuidv4();
    const jobDoc = await db.collection("Jobs").doc(jobId.toString());
    const job = await new Job(
      jobId.toString(),
      jobData.jobTitle,
      jobData.jobType,
      jobData.jobRole,
      jobData.jobResponsibilities,
      jobData.jobRequirements,
      jobData.jobBenefits,
      jobData.jobSalary,
      jobData.jobLocation,
      jobData.jobPrivacyPolicy,
      jobData.companyName,
      jobData.companyTagLine,
      jobData.companyDescription
    );

    await jobDoc.set(Object.assign({}, job));
    await res.status(200).send("Job posted Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
