import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyAuthContext } from "../Context/AuthenticationContext";

//To stop unautorized users accessing the routes
function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { user } = useMyAuthContext();
  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  }, [user, navigate]);
  return <div>{children}</div>;
}

export default ProtectedRoutes;
