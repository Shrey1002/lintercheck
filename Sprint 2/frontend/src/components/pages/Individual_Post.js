import React, { useState, useEffect, useContext } from "react";
import { Button, Typography, Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import UserContext from "../../UserContext";

const Individual_Job = () => {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);
  const { postId } = useParams();
  const { refetchUser } = useContext(UserContext);
  const [companyName, setCompanyName] = useState(null);


  const [open, setOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");


  const [inputs, setInputs] = useState({
    userId: user["_id"],
    postId: postId
  })

  async function fetchCompanyName(companyId) {
    const response = await fetch(`http://localhost:9000/Users/Users/${companyId}`);
    const companyData = await response.json();
    return companyData.data.user.company;
  }


  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:9000/Posts/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        setSnackbarMessage("Error applying")
        setSnackbarSeverity("error")
        setOpen(true);
      } else {
        setApplied(true);
        setSnackbarMessage("Applied successfully!")
        setSnackbarSeverity("success")
        setOpen(true);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error applying to the post:", error);
      // Handle the error as needed
    }

    await refetchUser();

    // Update user data with the new applied job
    const updatedUser = { ...user, applied: [...user.applied, postId] };

    // Save the updated user data back to the context and localStorage
    setUser(updatedUser);
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:9000/Users/Concordia548/Posts/${postId}`);
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        const actualData = await response.json();

        const companyName = await fetchCompanyName(actualData.data.myPost.company);
        setCompanyName(companyName);

        setData(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  return (
    <div>
      <Typography>
        <div className="container2">
          {/* <p className="form-title2" style={{ paddingTop: "2%" }}>Post for {data["data"]["myPost"].title}</p> */}
          {loading && <div>A moment please...</div>}
          {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
          )}
          <ul style={{ listStyle: 'none', paddingTop: '20px' }}>
            {data && (
              <li className="jobitem1">
                <div className="dfj">
                  <h1 className="hone">{data["data"]["myPost"].title}</h1>
                  <Button onClick={handleClick} className="btnapply">Apply</Button>
                </div>
                <div className="dfd">
                  <h4>{companyName}</h4>
                  <h5>&nbsp;| {data["data"]["myPost"].location}</h5>
                </div>
                <h5 className="hfive"><b> Date Posted: </b> {data["data"]["myPost"].date_posted}</h5>
                <h4 className="hfour"><b>Job description:</b> {data["data"]["myPost"].description}</h4>
              </li>
            )}
          </ul>
        </div>
      </Typography>

      <Snackbar
        open={open}
        severity="success"
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Individual_Job;
