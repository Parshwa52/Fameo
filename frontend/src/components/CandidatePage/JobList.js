import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export const JobList = (props) => {
  const [jobData, setJobData] = useState([]);

  const [appliedJobData, setAppliedJobData] = useState([]);

  useEffect(() => {
    const getJobData = async () => {
      await fetch(
        "https://us-central1-fameo-d8a3e.cloudfunctions.net/default/api/jobs"
      )
        .then((res) => res.json())
        .then((data) => setJobData(data));

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const reqBody = JSON.stringify({
        email: props.email,
      });

      const options = {
        method: "POST",
        headers: myHeaders,
        body: reqBody,
        redirect: "follow",
      };

      await fetch(
        "https://us-central1-fameo-d8a3e.cloudfunctions.net/default/api/myAppliedJobs",
        options
      )
        .then((res) => res.json())
        .then((data) => {
          setAppliedJobData(data);
        });
    };

    getJobData();
  }, []);

  return (
    <div id="fameo-features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Jobs For You</h2>
        </div>
        <div className="row">
          {jobData
            ? jobData.map((d, i) => (
                <div key={`${d.jobId}-${i}`} className="col-xs-6 col-md-3">
                  {" "}
                  <JobCard job={d} email={props.email} />
                </div>
              ))
            : "Loading..."}
        </div>
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Your Applied Jobs</h2>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ApplicationId</TableCell>
                <TableCell>JobId</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appliedJobData.map((applicantData) => (
                <TableRow
                  key={applicantData.applicationId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{applicantData.applicationId}</TableCell>
                  <TableCell>{applicantData.jobId}</TableCell>

                  <TableCell>{applicantData.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
