import React, { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function ApplicantsTable({ job, email }) {
  const [jobApplicants, setJobApplicants] = useState([]);
  const [profile, setProfile] = useState({});
  const [appId, setAppId] = useState("");
  const [profileModal, setProfileModal] = useState(false);
  useEffect(() => {
    const getJobApplicants = async () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const reqBody = JSON.stringify({
        jobId: job.jobId,
      });

      const options = {
        method: "POST",
        headers: myHeaders,
        body: reqBody,
        redirect: "follow",
      };

      await fetch(
        "https://us-central1-fameo-d8a3e.cloudfunctions.net/default/api/getJobApplicants",
        options
      )
        .then((res) => res.json())
        .then((data) => {
          //console.log({ data });
          setJobApplicants(data);
        });
    };

    getJobApplicants();
  }, []);

  const showProfile = async (candEmail, applicationId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const reqBody = JSON.stringify({
      candidateEmail: candEmail,
    });

    const options = {
      method: "POST",
      headers: myHeaders,
      body: reqBody,
      redirect: "follow",
    };

    await fetch(
      "https://us-central1-fameo-d8a3e.cloudfunctions.net/default/api/getCandidate",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setProfile(data[0]);
        setAppId(applicationId);
        openTheProfileModal();
      });
  };

  // const [openJob, setOpenJob] = useState(false);

  const openTheProfileModal = () => {
    setProfileModal(true);
  };

  const closeTheProfileModal = () => {
    setProfileModal(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <h3>Job ID: {job.jobId}</h3>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ApplicationId</TableCell>
              <TableCell>CandidateEmail</TableCell>
              <TableCell>Candidate Profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobApplicants.map((applicant) =>
              applicant.status === "Pending" ? (
                <TableRow
                  key={applicant.applicationId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{applicant.applicationId}</TableCell>
                  <TableCell>{applicant.candidateEmail}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      onClick={() =>
                        showProfile(
                          applicant.candidateEmail,
                          applicant.applicationId
                        )
                      }
                    >
                      Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                <></>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <ProfileModal
        applicationId={appId}
        open={profileModal}
        profile={profile}
        handleClose={closeTheProfileModal}
      />

      {/* <Card sx={{ maxWidth: 345 }} onClick={openTheJobModal}>
        <CardHeader title={job.companyName} subheader={job.jobTitle} />
        <CardMedia
          component="img"
          height="194"
          image={job.companyLogo}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {job.companyTagLine}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">{job.jobType}</IconButton>|
          <IconButton aria-label="add to favorites">
            {job.jobLocation}
          </IconButton>
          |<IconButton aria-label="share">${job.jobSalary}</IconButton>
        </CardActions>
      </Card>
      <br />
      <br />
      <br />
      <br />
      <br />
       */}
    </div>
  );
}
