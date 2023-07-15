import React, { createContext, useContext, useEffect, useState } from "react";
import { userAuth } from "../firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import axios from 'axios'

//creating the context
const myContext = createContext();

function AuthenticationContext({ children }) {
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState({});
  const [departments, setDepartments] = useState([])
  const [employees, setEmployees] = useState([])
  const [departmentCount, setDepartmentCount] = useState(0)
  const [employeeCount, setEmployeeCount] = useState(0)
  const [projects, setProjects] = useState([])
  const [projectCount, setProjectCount] = useState(0)
  const [leaves, setLeaves] = useState([])
  const [leavesCount, setLeavesCount] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  const [updateState, setUpdateState] = useState(false)


  //to change the entire application state when state is updated

  const change = () => {
    setUpdateState(p => !p)
  }


  //to check whether the user is admin or not

  useEffect(() => {
    if (userRole?.role === "admin") {
      setIsAdmin(true)
    }
  }, [userRole,user,updateState])


  //to fetch all the leaves 
  useEffect(() => {
    axios.get("http://localhost:8060/leaves").then((res) => {
      setLeaves(res?.data)
      setLeavesCount(res?.data?.length)
    }).catch((err) => {
      console.log(err.message);
    })
  }, [updateState])
  //to fetch UserProfile
  useEffect(() => {
    const userProfile = allUsers.filter((val) => val.email === user?.email);
    setUserRole(userProfile?.[0]);
  }, [allUsers, user]);


  //to fetch all the projects

  useEffect(() => {
    axios.get("http://localhost:8060/projects").then((res) => {
      setProjects(res?.data)
      setProjectCount(res?.data?.length)
    })
  }, [updateState])

  //to fetch all the employees
  useEffect(() => {
    axios.get("http://localhost:8060/employees").then((res) => {
      setEmployees(res.data)
      setEmployeeCount(res?.data?.length)
    })
  }, [updateState])

  console.log("emp", employees);

  //fetch all the department details
  useEffect(() => {
    axios.get("http://localhost:8060/departments").then((res) => {
      setDepartments(res.data)
      setDepartmentCount(res?.data?.length)
    }).catch((err) => {
      console.log(err.message)
    })
  }, [updateState])

  //google sign up
  const provider = new GoogleAuthProvider();
  const googleSignUp = () => {
    return signInWithPopup(userAuth, provider);
  };


  //getting the data of all the users
  useEffect(() => {
    const getAllDataFromCollection = async (collectionName) => {
      try {
        const db = getFirestore();
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef);

        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log("All data from collection:", data);
        return data;
      } catch (error) {
        console.error("Error getting data from collection:", error);
        return [];
      }
    };

    getAllDataFromCollection("users").then((res) => {
      setAllUsers(res);
    });
  }, [user]);


  //To logout the user
  const signUserOut = () => {
    return signOut(userAuth);
  };


  //to get the details of current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(userAuth, (currentUser) => {
      setUser(currentUser);
    });

   

    return () => unsubscribe();
  }, []);
  console.log(user)
 
  return (
    <myContext.Provider
      value={{
        googleSignUp, user, signUserOut, allUsers,
        userRole, departments, departmentCount, employeeCount, employees,
        projects, projectCount, leaves, leavesCount, isAdmin, change
      }}
    >
      {children}
    </myContext.Provider>
  );
}

//custom Hook that uses the context 
export function useMyAuthContext() {
  return useContext(myContext);
}
export default AuthenticationContext;
