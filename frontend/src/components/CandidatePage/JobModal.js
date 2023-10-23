import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
const theme = createTheme();
export default function JobModal({ open, job, handleClose, email }) {
  const [uploadingProgress, setUploadingProgress] = React.useState(false);
  const applyToJob = async () => {
    setUploadingProgress(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const reqBody = JSON.stringify({
      applicationData: {
        candidateEmail: email,
        companyEmail: job.companyEmail,
        jobId: job.jobId,
        status: "Pending",
      },
    });

    const options = {
      method: "POST",
      headers: myHeaders,
      body: reqBody,
      redirect: "follow",
    };

    await fetch(
      "https://us-central1-fameo-d8a3e.cloudfunctions.net/default/api/applyJob",
      options
    )
      .then((res) => res.text())
      .then((data) => {
        setUploadingProgress(false);
        alert("Congrats! Your have applied in 1 click");
        handleClose();
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ToastContainer />
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h4>Job ID: {job.jobId}</h4>
              <div align="center">
                <h3>{job.companyName}</h3>
                <br />
                <img src={job.companyLogo} alt="companyLogo" />
                <br />
                <h4 style={{ fontFamily: "Raleway" }}>{job.companyTagLine}</h4>
              </div>

              <h4 style={{ fontFamily: "Raleway" }}>About Us</h4>
              <p style={{ fontFamily: "Raleway", fontSize: 13 }}>
                {job.companyDescription}
              </p>
              <h4 style={{ fontFamily: "Raleway" }}>Website</h4>
              <p style={{ fontFamily: "Raleway", fontSize: 13 }}>
                <a href={job.companyWebsite} target="_blank" rel="noreferrer">
                  {job.companyWebsite}
                </a>
              </p>
              <h4 style={{ fontFamily: "Raleway" }}>Job Title</h4>
              <p style={{ fontFamily: "Raleway", fontSize: 13 }}>
                {job.jobTitle}
              </p>

              <h4 style={{ fontFamily: "Raleway" }}>Job Role</h4>
              <p style={{ fontFamily: "Raleway", fontSize: 13 }}>
                {job.jobRole}
              </p>

              <h4 style={{ fontFamily: "Raleway" }}>Job Responsibilities</h4>
              <p style={{ fontFamily: "Raleway", fontSize: 13 }}>
                {job.jobResponsibilities}
              </p>

              <h4 style={{ fontFamily: "Raleway" }}>Job Requirements</h4>
              <p style={{ fontFamily: "Raleway", fontSize: 13 }}>
                {job.jobRequirements}
              </p>

              <h4 style={{ fontFamily: "Raleway" }}>Job Benefits</h4>
              <p style={{ fontFamily: "Raleway", fontSize: 13 }}>
                {job.jobBenefits}
              </p>

              <h4 style={{ fontFamily: "Raleway" }}>Job Location</h4>
              <p style={{ fontFamily: "Raleway", fontSize: 13 }}>
                {job.jobLocation}
              </p>

              <h4 style={{ fontFamily: "Raleway" }}>Job Salary</h4>
              <p style={{ fontFamily: "Raleway", fontSize: 13 }}>
                {job.jobSalary}
              </p>

              <h4 style={{ fontFamily: "Raleway" }}>Job Type</h4>
              <p style={{ fontFamily: "Raleway", fontSize: 13 }}>
                {job.jobType}
              </p>

              <h4 style={{ fontFamily: "Raleway" }}>Job Privacy Policy</h4>
              <p style={{ fontFamily: "Raleway", fontSize: 13 }}>
                {job.jobPrivacyPolicy}
              </p>

              {uploadingProgress ? (
                <CircularProgress />
              ) : (
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => applyToJob()}
                >
                  1 Click Apply
                </Button>
              )}
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
