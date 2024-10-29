import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UseAuth } from "../store/auth";

function Logout() {
  const { logoutUser } = UseAuth();

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Navigate to="/" />;
}

export default Logout;
