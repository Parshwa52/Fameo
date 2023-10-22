class Application {
  constructor(applicationId, candidateEmail, companyEmail, jobId, status) {
    (this.applicationId = applicationId),
      (this.candidateEmail = candidateEmail),
      (this.companyEmail = companyEmail),
      (this.jobId = jobId),
      (this.status = status);
  }
}

export default Application;
