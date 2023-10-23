import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CircularProgress } from "@mui/material";
const theme = createTheme();

export default function PostJob({
  companyData,
  uploadopen,
  handleUploadClose,
}) {
  const [jobTitle, setJobTitle] = React.useState("");
  const [jobRole, setJobRole] = React.useState("");
  const [jobResponsibilities, setJobResponsibilities] = React.useState("");
  const [jobRequirements, setJobRequirements] = React.useState("");
  const [jobBenefits, setJobBenefits] = React.useState("");
  const [jobLocation, setJobLocation] = React.useState("");
  const [jobSalary, setJobSalary] = React.useState("");
  const [jobType, setJobType] = React.useState("");
  const [jobPrivacyPolicy, setJobPrivacyPolicy] = React.useState("");
  const [uploadingProgress, setUploadingProgress] = React.useState(false);
  const handleJobPosting = async () => {
    setUploadingProgress(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const reqBody = JSON.stringify({
      jobData: {
        jobTitle: jobTitle,
        jobType: jobType,
        jobRole: jobRole,
        jobResponsibilities: jobResponsibilities,
        jobRequirements: jobRequirements,
        jobBenefits: jobBenefits,
        jobSalary: jobSalary,
        jobLocation: jobLocation,
        jobPrivacyPolicy: jobPrivacyPolicy,
        companyName: companyData.name,
        companyTagLine: companyData.tagLine,
        companyDescription: companyData.description,
        companyLogo: companyData.logo,
        companyWebsite: companyData.website,
        companyEmail: companyData.email,
      },
    });

    const options = {
      method: "POST",
      headers: myHeaders,
      body: reqBody,
      redirect: "follow",
    };

    await fetch(
      "https://us-central1-fameo-d8a3e.cloudfunctions.net/default/api/postJob",
      options
    )
      .then((res) => res.text())
      .then((data) => {
        setUploadingProgress(false);
        alert("Congrats! Your have posted a job");
        handleUploadClose();
        window.location.reload(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="false">
        <Dialog open={uploadopen} onClose={handleUploadClose}>
          <div style={{ width: 500 }}>
            <DialogContent>
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div align="center">
                  <Typography component="h1" variant="h5">
                    Post Job
                  </Typography>
                </div>

                <div align="center">
                  <h3>{companyData.name}</h3>
                  <br />
                  <img src={companyData.logo} />
                  <br />
                  <h4 style={{ fontFamily: "Raleway" }}>
                    {companyData.tagLine}
                  </h4>
                </div>

                <h4 style={{ fontFamily: "Raleway" }}>About Us</h4>
                <p style={{ fontFamily: "Raleway", fontSize: 13 }}>
                  {companyData.description}
                </p>
                <h4 style={{ fontFamily: "Raleway" }}>Website</h4>
                <p style={{ fontFamily: "Raleway", fontSize: 13 }}>
                  <a href={companyData.website} target="_blank">
                    {companyData.website}
                  </a>
                </p>
                <Box component="form">
                  <h6>Job Title</h6>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="jobTitle"
                    label="Job Title"
                    name="jobTitle"
                    autoComplete="jobTitle"
                    autoFocus
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                  <h6>Job Role</h6>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="jobRole"
                    label="Job Role"
                    name="jobRole"
                    autoComplete="jobRole"
                    onChange={(e) => setJobRole(e.target.value)}
                  />
                  <h6>Job Responsibilities</h6>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="jobResponsibilities"
                    label="Job Responsibilities"
                    name="jobResponsibilities"
                    autoComplete="jobResponsibilities"
                    autoFocus
                    onChange={(e) => setJobResponsibilities(e.target.value)}
                  />
                  <h6>Job Requirements</h6>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="jobRequirements"
                    label="Job Requirements"
                    name="jobRequirements"
                    autoComplete="jobRequirements"
                    autoFocus
                    onChange={(e) => setJobRequirements(e.target.value)}
                  />
                  <h6>Job Benefits</h6>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="jobBenefits"
                    label="Job Benefits"
                    name="jobBenefits"
                    autoComplete="jobBenefits"
                    autoFocus
                    onChange={(e) => setJobBenefits(e.target.value)}
                  />
                  <h6>Job Location</h6>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="jobLocation"
                    label="Job Location"
                    name="jobLocation"
                    autoComplete="jobLocation"
                    autoFocus
                    onChange={(e) => setJobLocation(e.target.value)}
                  />
                  <h6>Job Salary in dollars</h6>
                  <TextField
                    inputProps={{ type: "number" }}
                    margin="normal"
                    required
                    fullWidth
                    name="jobSalary"
                    label="Job Salary in dollars"
                    type="jobSalary"
                    id="jobSalary"
                    autoComplete="jobSalary"
                    digit="true"
                    onChange={(e) => setJobSalary(e.target.value)}
                  />
                  <h6>Job Type</h6>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="jobType"
                    label="Job Type"
                    name="jobType"
                    autoComplete="jobType"
                    autoFocus
                    onChange={(e) => setJobType(e.target.value)}
                  />
                  <h6>Job Privacy Policy</h6>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="jobPrivacyPolicy"
                    label="Job Privacy Policy"
                    name="jobPrivacyPolicy"
                    autoComplete="jobPrivacyPolicy"
                    autoFocus
                    onChange={(e) => setJobPrivacyPolicy(e.target.value)}
                  />

                  {uploadingProgress ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleJobPosting}
                      color="success"
                      disabled={
                        jobTitle === "" ||
                        jobRole === "" ||
                        jobResponsibilities === "" ||
                        jobRequirements === "" ||
                        jobBenefits === "" ||
                        jobLocation === "" ||
                        jobSalary === "" ||
                        jobType === "" ||
                        jobPrivacyPolicy === ""
                      }
                    >
                      Post Job
                    </Button>
                  )}
                </Box>
              </Box>
            </DialogContent>
          </div>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
