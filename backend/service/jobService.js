import db from "../firebase.js";
import Job from "../model/jobModel.js";

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
