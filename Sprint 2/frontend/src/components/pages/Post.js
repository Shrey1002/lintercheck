import { TextField, Button, Paper } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import { useTheme } from "../theme/ThemeProvider";

import "../../css_files/jobpost.css";

function Post() {
  const { currentTheme } = useTheme();
  const textColor = currentTheme === "light" ? "black" : "white";

  const { user } = useContext(UserContext);
  console.log(user["_id"]);

  useEffect(() => {
    if (user["User_type"] !== "employer") {
      navigate("/home");
    }
  });

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    location: "",
    company: user["_id"],
  });

  const [postable, setPostable] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostable(true);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (postable) {
      fetch(`http://localhost:9000/Users/${user["_id"]}/Posts`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json["status"] === "success") {
            navigate("/home");
          }
        });
      setPostable(false);
    }
  });

  return (
    user["User_type"] === "employer" && (
      <div className="container1">
        <p className="form-title2" style={{ paddingTop: "5%" }}>
          Add New Job Posting
        </p>
        <form
          style={{ paddingTop: "2%" }}
          className="postForm"
          onSubmit={handleSubmit}
        >
          <Paper
            className="form-item"
            style={{
              color: textColor,
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TextField
              required
              id="title"
              onChange={handleChange}
              name="title"
              label="Title of Job"
              fullWidth
            />
          </Paper>

          <Paper
            className="form-item"
            style={{
              color: textColor,
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TextField
              required
              multiline
              rows={6}
              id="description"
              onChange={handleChange}
              name="description"
              label="Job Description"
              fullWidth
            />
          </Paper>

          <Paper
            className="form-item"
            style={{
              color: textColor,
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TextField
              required
              id="location"
              onChange={handleChange}
              name="location"
              label="Location"
              fullWidth
            />
          </Paper>

          <Button
            type="submit"
            variant="contained"
            style={{
              padding: "10px",
              marginBottom: "5%",
              backgroundColor: "black",
              color: "white",
              borderRadius: "8px",
            }}
          >
            Post Job
          </Button>
        </form>
      </div>
    )
  );
}

export default Post;
