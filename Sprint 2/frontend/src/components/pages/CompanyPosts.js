import React, { useState, useEffect, useContext } from 'react';
import { List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';

const CompanyPosts = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDeletePost = async (postId) => {
    try {
      await fetch(`http://localhost:9000/Posts/deletePost/${postId}`, {
        method: 'DELETE',
      });
      // After successful deletion, remove the deleted post from the state
      setData((prevData) => prevData.filter((post) => post._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:9000/Posts/company/${user["_id"]}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData["data"]["posts"]);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(data);
  return (
    <div className="container1">
      <p className="form-title2" style={{ paddingTop: "5%" }}>Posted Jobs</p>
      {/* <h1>My Posts</h1> */}
      {loading && <div>Loading...</div>}
      {error && <div>{`Error fetching data: ${error}`}</div>}
      <List>
        {data &&
          data.map((post) => (
            <ListItem key={post._id}>
              <ListItemText primary={post.title} />
              <Box>
                <Button
                  component={Link}
                  to={`/postdetails/${post["_id"]}`}
                  variant="contained" className='btn'
                >
                  Manage Post
                </Button>
                <Button
                  component={Link}
                  to={`/editpost/${post["_id"]}`}
                  variant="contained" color="primary" className='btn'
                >
                  Edit Post
                </Button>
                <Button
                  onClick={() => handleDeletePost(post._id)}
                  variant="contained" color="error" className='btn'
                >
                  Delete Post
                </Button>
              </Box>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default CompanyPosts;
