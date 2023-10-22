import db from "../firestore.js";
import Application from "../model/applicationModel.js";
import Candidate from "../model/candidateModel.js";
import Company from "../model/companyModel.js";
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
        doc.data().companyDescription,
        doc.data().companyLogo,
        doc.data().companyWebsite
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
      jobData.companyDescription,
      jobData.companyLogo,
      jobData.companyWebsite
    );

    await jobDoc.set(Object.assign({}, job));
    await res.status(200).send("Job posted Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const registerCandidate = async (req, res, next) => {
  try {
    var candidateData = await req.body.candidateData;
    var candidateEmail = await candidateData.email;
    const candidateDoc = await db
      .collection("Candidates")
      .doc(candidateEmail.toString());
    const candidate = await new Candidate(
      candidateData.email,
      candidateData.firstName,
      candidateData.lastName,
      candidateData.linkedinLink,
      candidateData.resume,
      candidateData.type
    );

    await candidateDoc.set(Object.assign({}, candidate));
    await res.status(200).send("Candidate registered Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const registerCompany = async (req, res, next) => {
  try {
    var companyData = await req.body.companyData;
    var companyEmail = await companyData.email;
    const companyDoc = await db
      .collection("Companies")
      .doc(companyEmail.toString());

    const company = await new Company(
      companyData.email,
      companyData.name,
      companyData.tagLine,
      companyData.description,
      companyData.logo,
      companyData.website,
      companyData.type
    );

    await companyDoc.set(Object.assign({}, company));
    await res.status(200).send("Company registered Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const applyJob = async (req, res, next) => {
  try {
    var applicationData = await req.body.applicationData;
    var applicationId = await uuidv4();
    const applicationDoc = await db
      .collection("Applications")
      .doc(applicationId.toString());

    const application = await new Application(
      applicationData.applicationId,
      applicationData.candidateEmail,
      applicationData.companyEmail,
      applicationData.jobId,
      applicationData.status
    );

    await applicationDoc.set(Object.assign({}, application));
    await res.status(200).send("Application done Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const myAppliedJobs = async (req, res, next) => {
  try {
    const myAppliedJobsData = await db
      .collection("Applications")
      .where("candidateEmail", "=", req.body.email.toString())
      .get();

    const applicationArray = [];
    myAppliedJobsData.forEach((doc) => {
      const application = new Application(
        doc.data().applicationId,
        doc.data().candidateEmail,
        doc.data().companyEmail,
        doc.data().jobId,
        doc.data().status
      );
      applicationArray.push(application);
    });
    await res.status(200).send(applicationArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const myPostedJobs = async (req, res, next) => {
  try {
    const myPostedJobsData = await db
      .collection("Applications")
      .where("companyEmail", "=", req.body.email.toString())
      .get();

    const applicationArray = [];
    myPostedJobsData.forEach((doc) => {
      const application = new Application(
        doc.data().applicationId,
        doc.data().candidateEmail,
        doc.data().companyEmail,
        doc.data().jobId,
        doc.data().status
      );
      applicationArray.push(application);
    });
    await res.status(200).send(applicationArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
