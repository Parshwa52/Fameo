import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
      <JobModal
        open={openJob}
        job={job}
        handleClose={closeTheJobModal}
        email={email}
      />
    </div>
  );
}
