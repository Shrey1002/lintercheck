import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
//import './home.css'
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  FormGroup,
  Button,
  Paper
} from "@mui/material";
import { useTheme } from "../theme/ThemeProvider";

import "../../css_files/signin.css";

function SignUp() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    User_type: "",

    //userType: "",
    //education: "",
    //industry: "",
    //location: "",
    ///////////
    lastname: "",
    company: "",
    // _id: "",
    phone: "",
    // CV: "",
    // applied: [],
  });

  const { currentTheme } = useTheme();
  const textColor = currentTheme === 'light' ? 'black' : 'white';

  const navigate = useNavigate();
  const [postable, setPostable] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (inputs.User_type === "employer") {
      setIsEmployer(true);
    } else {
      setIsEmployer(false);
    }
  }, [inputs]);

  const [selected, setSelected] = useState('seeker');

  const handleChang = event => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.password.length < 8) {
      setOpen(true);
    } else {
      setPostable(true);
    }
  };

  useEffect(() => {
    if (postable) {
      fetch("http://localhost:9000/Signup", {
      

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
            navigate("/signIn");
          }
        });
      setPostable(false);
    }
  });

  return (
    <div className="auth-form-container" style={{ paddingTop: "4%" }}>
      <div className="login-page signp">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img src="https://aristeksystems.com/static/45bd5eec30039fea862fd2ddabad5444/03_JS.svg?q=80&auto=format%2Ccompress&h=700" alt="Login" />
          </div>
          <div className="sinup">
            <form className="signup-form" onSubmit={handleSubmit}>
              <p className="form-title1">Sign Up with CareerConnect</p>
              <FormGroup>
                <FormControl
                  required
                  onChange={handleChange}
                  value={inputs.User_type} style={{ marginBottom: '5px' }}>
                  <FormLabel id="User_type" style={{ fontWeight: '700' }}>User Type
                  </FormLabel>
                  <RadioGroup name="User_type">
                    <div className="radiodiv">
                      <FormControlLabel
                        value="seeker"
                        control={<Radio />}
                        label="Job Seeker"
                        checked={selected === 'seeker'}
          onChange={handleChang}
                      />
                      <FormControlLabel
                        value="employer"
                        control={<Radio />}
                        label="Employer"
                        onChange={handleChang}
          checked={selected === 'employer'}
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
                {isEmployer ? (
                  <>
                    <Paper style={{ color: textColor, marginBottom: '15px' }}>
                      <TextField
                        required
                        id="company"
                        onChange={handleChange}
                        value={inputs.company}
                        name="company"
                        label="Company Name"
                        style={{ width: '100%' }}
                      />
                    </Paper>
                  </>
                ) : (
                  <>
                    <Paper style={{ color: textColor, marginBottom: '15px' }}>
                      <TextField
                        required
                        id="name"
                        onChange={handleChange}
                        value={inputs.name}
                        name="name"
                        label="Full Name"
                        style={{ width: '100%' }}
                      />
                    </Paper>
                  </>
                )}
                <Paper style={{ color: textColor, marginBottom: '15px' }}>
                  <TextField
                    required
                    id="email"
                    onChange={handleChange}
                    value={inputs.email}
                    name="email"
                    label="Email"
                    style={{ width: '100%' }}
                  />
                </Paper>

                <Paper style={{ color: textColor, marginBottom: '15px' }}>
                  <TextField
                    required
                    id="password"
                    value={inputs.password}
                    onChange={handleChange}
                    label="Password"
                    type="password"
                    name="password"
                    style={{ width: '100%' }}
                  />
                </Paper>
            
                <Button type="submit" variant="outlined" style={{ padding: '10px' }}>
                  Sign Up
                </Button>
              </FormGroup>
            </form>
            <p className="or" style={{textAlign: 'center'}}>OR</p>
            <ul>
              <li className="signuppage">
                <a href="/signIn">Already have an Account? Sign In</a>
              </li>
            </ul>

          </div>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Password needs to have a minimum length of 8 characters"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
