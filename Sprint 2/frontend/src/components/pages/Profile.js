import React, { useContext, useState } from "react";
import EditProfile from "./EditProfile";
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import { useTheme } from "../theme/ThemeProvider"
import "../../css_files/jobpost.css";
const Profile = () => {

  const { currentTheme } = useTheme();
  const textColor = currentTheme === 'light' ? 'black' : 'white';

  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    password: "",
    company: user ? user.company : '',
    phone: user ? user.phone : '',
  });
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate('/home')
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:9000/Users/${user._id}/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const updatedUser = await response.json();
      console.log("Updated user:", updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  return (
    user ?
      <div className="profile">
        <Container>
          <p className="h5" style={{ paddingTop: "10%" }}>Update User Information</p>

          <form onSubmit={handleSubmit} style={{ paddingTop: "4%" }}>
            {user?.User_type === "employer" ? (
              <>
                <Paper style={{ color: textColor }}>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      label="Company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Box>
                </Paper>

                <Paper style={{ color: textColor }}>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Box>
                </Paper>
              </>) :
              (
                <>
                  <Paper style={{ color: textColor }}>
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Box>
                  </Paper>
                  <Paper style={{ color: textColor }}>
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Box>
                  </Paper>
                </>)

            }
            <Button type="submit" variant="outlined" style={{ padding: '10px'}}>
              Edit Profile
            </Button>
          </form>

        </Container>
        {/* <Button variant="contained" onClick={handleLogout}>Log Out</Button> */}

      </div> : <><h1>You do not have access to this page</h1></>
  )
}

export default Profile
