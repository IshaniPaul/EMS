import React, { useEffect, useState } from "react";
import { useMyAuthContext } from "../Context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "./SignUp.css";
import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@mui/material";

function SignUp() {
  const { googleSignUp, user, allUsers } = useMyAuthContext();
  const navigate = useNavigate();
  const db = getFirestore();
  const collectionRef = collection(db, "users");
  const [role, setRole] = useState("employee");

  //function to check whether the user already exists or not
  const checkIfUserExists = (email) => {
    const result = allUsers.filter((val) => val.email === email);
    if (result && result.length > 0) {
      return true;
    }
    return false;
  };

  //Add new user data to database
  const addData = async (obj) => {
    try {
      await addDoc(collectionRef, obj);
      console.log("Data added successfully.");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  //if user is already logged in he will be redirected to home page
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  //if the user is already registered he will be logged in or else he will be registered as new user
  const signup = () => {
    try {
      googleSignUp().then((res) => {
        if (!checkIfUserExists(res.user?.email)) {
          addData({
            email: res.user?.email,
            name: res.user?.displayName,
            uid: res.user?.uid,
            role: role,
          })
            .then(() => {
              console.log(">>>>>>>>>>>", "added");
            })
            .then(() => {
              navigate("/");
            });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container fade">
      <div className="inner">
        <h1 style={{ textAlign: "center" }}>Employee Management System</h1>
        <div
          className="label"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "start",
            marginTop: "2.5rem",
          }}
        >
          <label htmlFor="role">Choose your role : </label>
        </div>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={signup}>
          <IconButton style={{ color: "blue" }}>
            <GoogleIcon />
          </IconButton>
          <span style={{ fontWeight: "500" }}>Sign In With Google</span>
        </button>
      </div>
    </div>
  );
}

export default SignUp;
