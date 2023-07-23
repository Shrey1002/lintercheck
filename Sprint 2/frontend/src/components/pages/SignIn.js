import React, { useState, useEffect, useContext } from "react";
import {
  FormGroup,
  Button,
  TextField,
  Snackbar,
  Alert,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import { useTheme } from "../theme/ThemeProvider"

import "../../css_files/signin.css";


function SignIn() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const { setUser } = useContext(UserContext);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { currentTheme } = useTheme();
  const textColor = currentTheme === 'light' ? 'black' : 'white';


  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSubmitted) {
      fetch("http://localhost:9000/Login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json["status"] === "success") {
            setSnackbarMessage("Login successful!");
            setSnackbarSeverity("success");
            setUser(json["data"]["userExist"]);
            localStorage.setItem(
              "user",
              JSON.stringify(json["data"]["userExist"])
            );
            console.log(json["data"]["userExist"]);
            setOpen(true);
            setTimeout(() => {
              if(localStorage.getItem("user") === "employer"){              
                navigate("/postJob");
              }else{
                navigate("/exp_jobs");

              }
                
            }, 2000);
          } else {
            setSnackbarMessage(json["message"]);
            setSnackbarSeverity("error");
            setOpen(true);
          }
        });
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  return (
    <div className="auth-form-container">
      <div className="login-page">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login" />
          </div>
          <form className="signin-form" onSubmit={handleSubmit}>
            <p className="form-title">Welcome back</p>
            <p>Login to the Dashboard</p>
            <FormGroup>
              <Paper className="text" style={{ color: textColor, marginBottom:'10px'}}>
                <TextField
                  required
                  id="email"
                  label="Email"
                  value={inputs.email}
                  name="email"
                  onChange={handleChange}
                  style={{ width: '100%'}}
                />
              </Paper>
              <Paper style={{ color: textColor, marginBottom:'10px' }}>
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                  value={inputs.password}
                  name="password"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </Paper>
              <ul>
                <li className="forgot">
                  <a href="/forgotPassword"> Forgot Password? </a>
                </li>
              </ul>
              <Button type="submit" variant="outlined" style={{ padding: '10px' }}>
                {" "}
                Sign In{" "}
              </Button>
              <p className="or">OR</p>
              <ul>
                <li className="signuppage">
                  <a href="/signUp"> New to CareerConnect? Join Now </a>
                </li>
              </ul>

            </FormGroup>
          </form>
          <Snackbar
            open={open}
            severity="success"
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
