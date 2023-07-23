import React, { useState, useContext } from "react";
import UserContext from "../../UserContext";
import ThemeContext from "../theme/ThemeContext";
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import "../../css_files/navbarStyles.css";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  function CustomLink({ href, children, ...props }) {
    const path = window.location.pathname;

    return (
      <li className={path === href ? "active" : ""}>
        <a href={href} {...props}>
          {children}
        </a>
      </li>
    );
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">

          <h2>CareerConnect</h2>
        </div>
        <div className="nav-elements">
          <ul>
            {
              // if (user != null){
              user?.User_type === "employer" ? (
                <>
                  <li>
                    <CustomLink href="/postJob">Post Job</CustomLink>
                  </li>
                  <li>
                    <CustomLink href={`/companyPosts/${user["_id"]}`}>
                      My Posts
                    </CustomLink>
                  </li>
                  <li>
                    <CustomLink href="/profile"> Edit Profile </CustomLink>
                  </li>
                  <li>
                    <Button className="btn" onClick={handleLogout}> Log Out  </Button>
                  </li>
                </>
              ) : user?.User_type === "seeker" ? (
                <>
                  <li>
                    <CustomLink href="/exp_jobs"> Explore Jobs </CustomLink>
                  </li>
                  <li>
                    <CustomLink href="/interviews">
                      {user["interviews"].length} Interviews
                    </CustomLink>
                  </li>
                  <li>
                    <CustomLink href="/applications">
                      Applications
                    </CustomLink>
                  </li>

                  <li>
                    <CustomLink href="/profile"> Edit Profile </CustomLink>
                  </li>
                  <li>
                    <Button className="btn" onClick={handleLogout}> Log Out  </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <CustomLink href="/home"> Home </CustomLink>
                  </li>
                  <li>
                    <CustomLink href="/signIn"> Sign In </CustomLink>
                  </li>
                  <li>
                    <CustomLink href="/signUp"> Sign Up </CustomLink>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;