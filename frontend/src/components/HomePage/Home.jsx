import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navigation } from "./navigation";
import { Header } from "./header";
import { Features } from "./features";
import { About } from "./about";
import { Team } from "./Team";
import { Contact } from "./contact";
import JsonData from "../../data/data.json";
import "../../App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { JobList } from "../CandidatePage/JobList";
import { MyPostedJobs } from "../CompanyPage/MyPostedJobs";
import SmoothScroll from "smooth-scroll";
export default function Home() {
  const loc = useLocation();

  const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
  });

  const [landingPageData, setLandingPageData] = useState({});
  const authToken = sessionStorage.getItem("Auth Token");
  const handleLogout = async () => {
    await signOut(auth);
    await sessionStorage.removeItem("Auth Token");
    await navigate("/");
  };

  const deleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete account and all its data permanently?"
      ) === true
    ) {
      const user = firebase.auth().currentUser;
      console.log({ user });
      user
        .delete()
        .then(async () => {
          // User deleted.
          await sessionStorage.removeItem("Auth Token");
          await navigate("/");
          alert("Your account successfully got deleted.");
        })
        .catch((error) => {
          alert("Error in deleting account. Please come back after sometime.");
        });
    } else {
      console.log("dont delete");
    }
  };
  let navigate = useNavigate();
  // useEffect(() => {
  //     let authToken = sessionStorage.getItem('Auth Token')
  //     if (authToken) {
  //         navigate('/home')
  //     }

  //     if (!authToken) {
  //         navigate('/register')
  //     }
  // }, [])

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  return (
    <div>
      <Navigation
        handleLogout={handleLogout}
        authToken={authToken}
        deleteAccount={deleteAccount}
        type={loc.state && loc.state.type}
      />
      <Header
        data={landingPageData.Header}
        authToken={loc.state && loc.state.authToken}
        type={loc.state && loc.state.type}
        companyData={loc.state && loc.state.companyData}
      />
      {loc.state && loc.state.type === "candidate" ? (
        <JobList email={loc.state.email} />
      ) : loc.state && loc.state.type === "company" ? (
        <MyPostedJobs companyData={loc.state.companyData} />
      ) : (
        <Features data={landingPageData.Features} />
      )}

      <About data={landingPageData.About} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
}
