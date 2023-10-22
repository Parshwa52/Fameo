class Candidate {
  constructor(email, firstName, lastName, linkedinLink, resume, type) {
    (this.email = email),
      (this.firstName = firstName),
      (this.lastName = lastName),
      (this.linkedinLink = linkedinLink),
      (this.resume = resume),
      (this.type = type);
  }
}

export default Candidate;
