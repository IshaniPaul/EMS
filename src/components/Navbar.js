import React, { useState } from "react";
import "./Navbar.css";
import { Link, Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMyAuthContext } from "../Context/AuthenticationContext";
import LogoutIcon from "@mui/icons-material/Logout";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import ClassIcon from "@mui/icons-material/Class";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EngineeringIcon from "@mui/icons-material/Engineering";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const { user, signUserOut, userRole } = useMyAuthContext();
  return (
    <>


      <div className="nav fade">
        <IconButton className="menu" onClick={() => setOpenMenu(true)}>
          {" "}
          <MenuIcon fontSize="large" />
        </IconButton>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          {" "}
          <h1 style={{ color: "black", cursor: "pointer" }}>Employee Management System </h1>
        </Link>
        <IconButton
          title="profile"
          className="profile"
          onClick={() => setOpenSettings(true)}
        >
          {" "}
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </div>

      {/* open user menu */}
      {openMenu && (
        <div className="sidebar fadeMenu">
          <IconButton onClick={() => setOpenMenu(false)}>
            <CloseIcon fontSize="large" />
          </IconButton>

          <div className="sidebarcontents">
            <Link onClick={() => setOpenMenu(false)} to={"/projects"}>
              <IconButton
                style={{ color: "black" }}
              >
                <EngineeringIcon fontSize="large" />
                Projects
              </IconButton></Link>
            <Link onClick={() => setOpenMenu(false)} to={"/leaves"}>
              <IconButton
                style={{ color: "black" }}
              >
                <PostAddRoundedIcon fontSize="large" />
                Leaves
              </IconButton></Link>
            <Link onClick={() => setOpenMenu(false)} to={"/employee"}>
              <IconButton
                style={{ color: "black" }}
              >
                <AccountCircleIcon fontSize="large" />
                Employees
              </IconButton></Link>
            <Link onClick={() => setOpenMenu(false)} to={"/department"}>
              <IconButton
                style={{ color: "black" }}
              >
                <ClassIcon fontSize="large" />
                Department
              </IconButton></Link>
          </div>
        </div>
      )}



      {/* open user settings */}
      {openSettings && (
        <div className="settings fadeSettings">
          <IconButton onClick={() => setOpenSettings(false)}>
            <CloseIcon fontSize="large" />
          </IconButton>

          <p
            style={{
              textAlign: "center",
              fontWeight: "700",
              textTransform: "capitalize",
            }}
          >
            <span style={{ opacity: "0.6", textTransform: "capitalize" }}>
              User Name{" "}
            </span>
            : {user && user.displayName}
          </p>

          <p
            style={{
              textAlign: "center",
              fontWeight: "700",
              textTransform: "capitalize",
            }}
          >
            <span style={{ opacity: "0.6", textTransform: "capitalize" }}>
              Role{" "}
            </span>
            : {userRole?.role}
          </p>
          <div className="center">
            <IconButton
              className="logout"
              style={{ color: "red" }}
              onClick={signUserOut}
            >
              <LogoutIcon />
              Logout
            </IconButton>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
}

export default Navbar;
