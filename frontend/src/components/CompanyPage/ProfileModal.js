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
const theme = createTheme();
export default function ProfileModal({
  open,
  profile,
  handleClose,
  applicationId,
}) {
  const revertCandidate = async (result) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const reqBody = JSON.stringify({
      applicationId: applicationId,
      result: result,
    });

    const options = {
      method: "POST",
      headers: myHeaders,
      body: reqBody,
      redirect: "follow",
    };

    await fetch(
      "https://us-central1-fameo-d8a3e.cloudfunctions.net/default/api/revertCandidate",
      options
    )
      .then((res) => res.text())
      .then((data) => {
        alert("We have informed the candidate about the result");
        handleClose();
        window.location.reload(true);
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
              }}
            >
              <h3>Application ID:</h3>
              <h4>{applicationId}</h4>
              <h3>Name:</h3>
              <h4>
                {profile.firstName} {profile.lastName}
              </h4>
              <h3>LinkedIn Link:</h3>
              <p style={{ fontFamily: "Raleway", fontSize: 13 }}>
                <a href={profile.linkedinLink} target="_blank" rel="noreferrer">
                  {profile.linkedinLink}
                </a>
              </p>

              <h3>Resume</h3>
              <iframe
                title="resume"
                src={profile.resume}
                style={{ width: "600px", height: "500px" }}
              ></iframe>
              <br />
              <br />
              <div align="center">
                <Button
                  color="success"
                  style={{ width: 20 }}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => revertCandidate("Accepted")}
                >
                  Accept
                </Button>
                <br />
                <br />
                <Button
                  color="warning"
                  style={{ width: 20 }}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => revertCandidate("Rejected")}
                >
                  Reject
                </Button>
              </div>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
