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
              <TableCell sx={{ fontSize: 15 }}>ApplicationId</TableCell>
              <TableCell sx={{ fontSize: 15 }}>CandidateEmail</TableCell>
              <TableCell sx={{ fontSize: 15 }}>Candidate Profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobApplicants.map((applicant) =>
              applicant.status === "Pending" ? (
                <TableRow
                  key={applicant.applicationId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ fontSize: 15 }}>
                    {applicant.applicationId}
                  </TableCell>
                  <TableCell sx={{ fontSize: 15 }}>
                    {applicant.candidateEmail}
                  </TableCell>
                  <TableCell sx={{ fontSize: 15 }}>
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
    </div>
  );
}
