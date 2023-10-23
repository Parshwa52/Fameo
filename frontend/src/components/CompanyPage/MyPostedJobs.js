import React, { useEffect, useState } from "react";
import ApplicantsTable from "./ApplicantsTable";
export const MyPostedJobs = (props) => {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const getMyPostedJobs = async () => {
      console.log(props.companyData.email);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const reqBody = JSON.stringify({
        email: props.companyData.email,
      });

      const options = {
        method: "POST",
        headers: myHeaders,
        body: reqBody,
        redirect: "follow",
      };

      await fetch(
        "https://us-central1-fameo-d8a3e.cloudfunctions.net/default/api/myPostedJobs",
        options
      )
        .then((res) => res.json())
        .then((data) => {
          //console.log({ data });
          setJobData(data);
        });
    };
    getMyPostedJobs();
  }, []);
  return (
    <div id="fameo-features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Your posted Jobs</h2>
        </div>
        <div className="row">
          {jobData
            ? jobData.map((d, i) => (
                <div key={`${d.jobId}-${i}`}>
                  {" "}
                  <ApplicantsTable job={d} email={props.email} />
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
