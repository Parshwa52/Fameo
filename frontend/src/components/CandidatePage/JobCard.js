import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import JobModal from "./JobModal";

export default function JobCard({ job, email }) {
  const [openJob, setOpenJob] = useState(false);

  const openTheJobModal = () => {
    setOpenJob(true);
  };

  const closeTheJobModal = () => {
    setOpenJob(false);
  };
  return (
    <div>
      <Card sx={{ maxWidth: 345 }} onClick={openTheJobModal}>
        <h4>{job.companyName}</h4>
        <h4>{job.jobTitle}</h4>
        <CardMedia
          component="img"
          height="194"
          width="190"
          image={job.companyLogo}
          alt="Company Logo"
        />

        <CardActions disableSpacing>
          <IconButton>
            <h4>{job.jobType}</h4>
          </IconButton>
          |
          <IconButton>
            <h4>{job.jobLocation}</h4>
          </IconButton>
          |
          <IconButton>
            <h4>${job.jobSalary}</h4>
          </IconButton>
        </CardActions>
      </Card>
      <br />
      <br />
      <br />
      <br />
      <JobModal
        open={openJob}
        job={job}
        handleClose={closeTheJobModal}
        email={email}
      />
    </div>
  );
}
