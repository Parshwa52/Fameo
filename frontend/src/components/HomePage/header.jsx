import React, { useState, useEffect } from "react";
import SignIn from "../Auth/Signin";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { firebaseConfig } from "../../firebase-config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import SignUp from "../Auth/Signup";
import PostJob from "../CompanyPage/PostJob";
export const Header = (props) => {
  const [signInopen, setSignInopen] = React.useState(false);
  const [signUpopen, setSignUpopen] = React.useState(false);
  const [uploadopen, setUploadOpen] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const [storage, setStorage] = useState({});

  const handleUploadClickOpen = () => {
    setUploadOpen(true);
  };

  const handleUploadClose = () => {
    setUploadOpen(false);
  };

  const handleSignUpClickOpen = () => {
    setSignUpopen(true);
  };

  const handleSignInClickOpen = () => {
    setSignInopen(true);
  };

  const handleSignUpClose = () => {
    setSignUpopen(false);
  };

  const handleSignInClose = () => {
    setSignInopen(false);
  };

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    setStorage(firebase.storage());
  }, []);

  const handleAuthAction = (id) => {
    const authentication = getAuth();

    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then(async (response) => {
          let authToken = response._tokenResponse.refreshToken;
          sessionStorage.setItem("Auth Token", authToken);
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const reqBody = JSON.stringify({
            companyEmail: email,
          });

          const options = {
            method: "POST",
            headers: myHeaders,
            body: reqBody,
            redirect: "follow",
          };

          await fetch(
            "https://us-central1-fameo-d8a3e.cloudfunctions.net/default/api/getCompany",
            options
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.length > 0) {
                navigate("/", {
                  state: {
                    authToken: authToken,
                    type: "company",
                    email: email,
                    companyData: data[0],
                  },
                });
              } else {
                navigate("/", {
                  state: {
                    authToken: authToken,
                    type: "candidate",
                    email: email,
                  },
                });
              }
            });
          handleSignInClose();
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            toast.error("Please check the Password");
          }
          if (error.code === "auth/user-not-found") {
            toast.error("Please check the Email");
          }
        });
    }
  };

  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>

                <form>
                  {props.authToken ? (
                    <div className="row">
                      {props.type === "candidate" ? (
                        <div></div>
                      ) : (
                        <div className="col-md-1 col-md-offset-4">
                          <input
                            type="button"
                            value="Post a Job"
                            className="btn btn-custom btn-lg page-scroll"
                            onClick={handleUploadClickOpen}
                          />
                          <PostJob
                            companyData={props.companyData}
                            uploadopen={uploadopen}
                            handleUploadClose={handleUploadClose}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-md-1 col-md-offset-4">
                        <input
                          type="button"
                          value="SignUp"
                          className="btn btn-custom btn-lg page-scroll"
                          onClick={handleSignUpClickOpen}
                        />
                        <SignUp
                          open={signUpopen}
                          handleSignUpClose={handleSignUpClose}
                          storage={storage}
                        />
                      </div>
                      <div className="col-md-1 col-md-offset-1">
                        <input
                          type="button"
                          value="Login"
                          className="btn btn-custom btn-lg page-scroll"
                          onClick={handleSignInClickOpen}
                        />
                        <SignIn
                          open={signInopen}
                          handleAuthAction={handleAuthAction}
                          setEmail={setEmail}
                          setPassword={setPassword}
                          handleClose={handleSignInClose}
                          email={email}
                          password={password}
                        />
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
