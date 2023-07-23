import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Paper } from '@mui/material';
import UserContext from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeProvider';

import '../../css_files/jobpost.css';

const EditPost = () => {
  const { currentTheme } = useTheme();
  const textColor = currentTheme === 'light' ? 'black' : 'white';

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { postId } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the job post data using the postId from the URL
    fetch(`http://localhost:9000/Posts/getPost/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        return response.json();
      })
      .then((actualData) => {
        setPost(actualData?.data?.myPost); // Modify to extract the post data from the response object
      })
      .catch((err) => {
        console.error('Error fetching post data:', err);
        setPost(null);
      });
  }, [postId]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission to update the job details

    if (!post) return; // No data available to update

    // Prepare the updated job data to be sent in the request body
    const updatedJobData = {
      title: post.title,
      description: post.description,
      location: post.location,
      // Add other properties as needed based on your form fields
    };

    fetch(`http://localhost:9000/Posts/updatePost/${postId}`, {
      method: 'PATCH', // Use PATCH method for updating the post
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJobData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        return response.json();
      })
      .then((updatedData) => {
        console.log('Job updated successfully:', updatedData);
        // Handle success case, e.g., show a success message or redirect to another page
        navigate('/companyPosts/0'); 
      })
      .catch((err) => {
        console.error('Error updating post data:', err);
        // Log the server's response if available
        if (err.response) {
          err.response.json().then((responseData) => {
            console.log('Server Response Data:', responseData);
          });
        }
        setPost(null);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  return (
    user['User_type'] === 'employer' && (
      <div className="container1">
        <p className="form-title2" style={{ paddingTop: '5%' }}>
          Edit Job Posting
        </p>
        <form style={{ paddingTop: '2%' }} className="postForm" onSubmit={handleFormSubmit}>
          <Paper
            className="form-item"
            style={{
              color: textColor,
              marginBottom: '15px',
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <TextField
              required
              id="title"
              onChange={handleChange}
              name="title"
              label="Title of Job"
              fullWidth
              value={post?.title || ''}
              variant="outlined"
            />
          </Paper>

          <Paper
            className="form-item"
            style={{
              color: textColor,
              marginBottom: '15px',
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
              value={post?.description || ''}
              variant="outlined"
            />
          </Paper>

          <Paper
            className="form-item"
            style={{
              color: textColor,
              marginBottom: '15px',
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <TextField
              required
              id="location"
              onChange={handleChange}
              name="location"
              label="Location"
              fullWidth
              value={post?.location || ''}
              variant="outlined"
            />
          </Paper>

          <Button
            type="submit"
            variant="contained"
            style={{
              padding: '10px',
              marginBottom: '5%',
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '8px',
            }}
          >
            Save Changes
          </Button>
        </form>
      </div>
    )
  );
};

export default EditPost;
