import React from "react";
export const Contact = (props) => {
  return (
    <div>
      <div id="fameo-contact">
        <div className="container">
          <div>
            <div className="fameo-contact-item">
              <h3>Contact Info</h3>
            </div>
            <div className="fameo-contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a
                      href={props.data ? "//www." + props.data.linkedin : "/"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={props.data ? "//www." + props.data.twitter : "/"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>&copy; 2023 Fameo </p>
        </div>
      </div>
    </div>
  );
};
