import * as React from "react";
import { Navigation } from "../HomePage/navigation";
import { useNavigate, useLocation } from "react-router-dom";
export default function PageNotFound() {
  const authToken = sessionStorage.getItem("Auth Token");
  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/");
  };
  let navigate = useNavigate();
  return (
    <div>
      <Navigation handleLogout={handleLogout} authToken={authToken} />
      <br />
      <br />
      <br />
      <br />
      <h1>404</h1>
      <h1>Page Not Found</h1>
    </div>
  );
}
