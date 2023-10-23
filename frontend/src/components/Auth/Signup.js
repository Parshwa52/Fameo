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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

const steps = ["Select profile", "Submit the details"];

export default function SignUp({ open, handleSignUpClose, storage }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [uploadingProgress, setUploadingProgress] = React.useState(false);
  const [profile, setProfile] = React.useState("");

  //candidate sign up data
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [linkedinLink, setLinkedinLink] = React.useState("");
  const [resume, setResume] = React.useState({});
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  //company sign up data
  const [companyName, setCompanyName] = React.useState("");
  const [tagLine, setTagLine] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [logo, setLogo] = React.useState({});
  const [companyEmail, setCompanyEmail] = React.useState("");
  const [companyPassword, setCompanyPassword] = React.useState("");

  let navigate = useNavigate();
  const handleChange = (event) => {
    setProfile(event.target.value);
  };

  const handleResumeUpload = async (emailAddress, filename, file) => {
    const path = `/EmployeeResumes/${emailAddress}/${filename}`;
    const ref = storage.ref(path);
    await ref.put(file);
    const url = await ref.getDownloadURL();
    return url;
  };

  const handleLogoUpload = async (emailAddress, filename, file) => {
    const path = `/CompanyLogos/${emailAddress}/${filename}`;
    const ref = storage.ref(path);
    await ref.put(file);
    const url = await ref.getDownloadURL();
    return url;
  };

  const handleEmployeeSignUp = () => {
    setUploadingProgress(true);
    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log({ user });
        const resume_url = await handleResumeUpload(
          email,
          email.toString(),
          resume
        );

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const reqBody = JSON.stringify({
          candidateData: {
            email: email,
            firstName: fname,
            lastName: lname,
            linkedinLink: linkedinLink,
            resume: resume_url.toString(),
            type: "candidate",
          },
        });

        const options = {
          method: "POST",
          headers: myHeaders,
          body: reqBody,
          redirect: "follow",
        };

        await fetch(
          "https://us-central1-fameo-d8a3e.cloudfunctions.net/default/api/registerCandidate",
          options
        )
          .then((res) => res.text())
          .then((data) => {
            setUploadingProgress(false);
            alert("Congrats! Your account is created successfully");
            user.getIdToken().then((token) => {
              sessionStorage.setItem("Auth Token", token);
              handleReset();
              navigate("/", {
                state: { authToken: token, type: "candidate" },
              });
            });
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          toast.error("Email Already in Use");
        }
      });
  };

  const handleEmployerSignUp = () => {
    setUploadingProgress(true);
    const authentication = getAuth();
    createUserWithEmailAndPassword(
      authentication,
      companyEmail,
      companyPassword
    )
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;

        const logo_url = await handleLogoUpload(
          companyEmail,
          companyEmail.toString(),
          logo
        );

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const reqBody = JSON.stringify({
          companyData: {
            email: companyEmail,
            name: companyName,
            tagLine: tagLine,
            description: description,
            website: website,
            logo: logo_url.toString(),
            type: "company",
          },
        });

        const options = {
          method: "POST",
          headers: myHeaders,
          body: reqBody,
          redirect: "follow",
        };

        await fetch(
          "https://us-central1-fameo-d8a3e.cloudfunctions.net/default/api/registerCompany",
          options
        )
          .then((res) => res.text())
          .then((data) => {
            setUploadingProgress(false);
            alert("Congrats! Your company account is created successfully");
            user.getIdToken().then((token) => {
              sessionStorage.setItem("Auth Token", token);
              handleReset();
              navigate("/", {
                state: {
                  authToken: token,
                  type: "company",
                  companyData: JSON.parse(reqBody),
                },
              });
            });
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          toast.error("Email Already in Use");
        }
      });
  };

  const handleNext = () => {
    if (activeStep == 1) {
      handleReset();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setProfile("");
    handleSignUpClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ToastContainer />
        <Dialog open={open} onClose={handleReset}>
          <DialogContent>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === 1 ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>Fill the Details</Typography>
                {profile === "Employee" ? (
                  <Box component="form">
                    <h3>Candidate Registration</h3>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="fname"
                      label="First Name"
                      name="fname"
                      autoComplete="fname"
                      autoFocus
                      onChange={(e) => setFname(e.target.value)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="lname"
                      label="Last Name"
                      name="lname"
                      autoComplete="lname"
                      onChange={(e) => setLname(e.target.value)}
                    />
                    <h6>Select Resume</h6>
                    <br />
                    <input
                      type="file"
                      accept="application/pdf,application/vnd.ms-excel"
                      hidden
                      style={{ display: "none" }}
                      id="contained-button-file-resume"
                      onChange={(e) => {
                        setResume(e.target.files[0]);
                      }}
                    />
                    <label htmlFor="contained-button-file-resume">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Upload Resume
                      </Button>
                    </label>

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="linkedinLink"
                      label="LinkedIn Link"
                      name="linkedinLink"
                      autoComplete="linkedinLink"
                      onChange={(e) => setLinkedinLink(e.target.value)}
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    {uploadingProgress ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleEmployeeSignUp}
                        color="success"
                        disabled={
                          fname === "" ||
                          lname === "" ||
                          !resume ||
                          linkedinLink === "" ||
                          email === "" ||
                          password === ""
                        }
                      >
                        Submit
                      </Button>
                    )}
                  </Box>
                ) : (
                  <Box component="form">
                    <h3>Company Registration</h3>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="companyName"
                      label="Company Name"
                      name="companyName"
                      autoComplete="companyName"
                      autoFocus
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="tagLine"
                      label="Tag Line"
                      name="tagLine"
                      autoComplete="tagLine"
                      onChange={(e) => setTagLine(e.target.value)}
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="description"
                      label="Description"
                      name="description"
                      autoComplete="description"
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    <h6>Upload Logo</h6>
                    <br />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      style={{ display: "none" }}
                      id="contained-button-file-resume"
                      onChange={(e) => {
                        setLogo(e.target.files[0]);
                      }}
                    />
                    <label htmlFor="contained-button-file-resume">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Upload
                      </Button>
                    </label>

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="website"
                      label="Website"
                      name="website"
                      autoComplete="website"
                      onChange={(e) => setWebsite(e.target.value)}
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="companyEmail"
                      label="Company Email"
                      name="companyEmail"
                      autoComplete="companyEmail"
                      onChange={(e) => setCompanyEmail(e.target.value)}
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="companyPassword"
                      label="Password"
                      name="companyPassword"
                      type="password"
                      autoComplete="companyPassword"
                      onChange={(e) => setCompanyPassword(e.target.value)}
                    />

                    {uploadingProgress ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleEmployerSignUp}
                        color="success"
                        disabled={
                          companyName === "" ||
                          tagLine === "" ||
                          !logo ||
                          description === "" ||
                          website === "" ||
                          companyEmail === "" ||
                          companyPassword === ""
                        }
                      >
                        Submit
                      </Button>
                    )}
                  </Box>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Choose your profile
                </Typography>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Profile
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={profile}
                      label="Profile"
                      onChange={handleChange}
                    >
                      <MenuItem value={"Employee"}>Employee</MenuItem>
                      <MenuItem value={"Employer"}>Employer</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </React.Fragment>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep !== 1 ? "Next" : "Finish"}
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
