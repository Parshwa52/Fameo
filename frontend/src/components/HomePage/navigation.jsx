import React from "react";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="/">
            FAMEO{" "}
          </a>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#fameo-features" className="page-scroll">
                {props.type === "candidate"
                  ? "Jobs For You"
                  : props.type === "company"
                  ? "Your posted jobs"
                  : "Features"}
              </a>
            </li>
            <li>
              <a href="#fameo-about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#fameo-team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href="#fameo-contact" className="page-scroll">
                Contact
              </a>
            </li>
            {props.authToken ? (
              <li>
                <button
                  className="btn btn-custom btn-lg"
                  onClick={props.handleLogout}
                >
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  Logout
                </button>
              </li>
            ) : (
              <li></li>
            )}
            {props.authToken ? (
              <li>
                <button
                  className="btn btn-danger btn-custom2 btn-lg"
                  onClick={props.deleteAccount}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                  Delete
                </button>
              </li>
            ) : (
              <li></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
