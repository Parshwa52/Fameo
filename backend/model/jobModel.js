class Job {
  constructor(
    jobId,
    jobTitle,
    jobType,
    jobRole,
    jobResponsibilities,
    jobRequirements,
    jobBenefits,
    jobSalary,
    jobLocation,
    jobPrivacyPolicy,
    companyName,
    companyTagLine,
    companyDescription
  ) {
    (this.jobId = jobId),
      (this.jobTitle = jobTitle),
      (this.jobType = jobType),
      (this.jobRole = jobRole),
      (this.jobResponsibilities = jobResponsibilities),
      (this.jobRequirements = jobRequirements),
      (this.jobBenefits = jobBenefits),
      (this.jobSalary = jobSalary),
      (this.jobLocation = jobLocation),
      (this.jobPrivacyPolicy = jobPrivacyPolicy),
      (this.companyName = companyName),
      (this.companyTagLine = companyTagLine),
      (this.companyDescription = companyDescription);
  }
}

export default Job;
