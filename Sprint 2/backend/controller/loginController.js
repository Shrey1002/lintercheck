const Candidate = require('../models/candidate');

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the candidate exists in the database.
      const candidate = await Candidate.findOne({ email });
  
      if (!candidate) {
        return res.status(404).json({
            message: 'Candidate not found',
            success: false,
            Received: req.body });
      }

      // Check if password is valid
      if(password !== candidate.password)
      {   
          return res.status(400).json({
              success:false,
              message:"Wrong Password"
          })
      }
  
      // Return a success response if the login is successful
      return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: {candidate} });
    } catch (error) {
      console.error('Error during candidate login:', error);
      return res.status(500).json({ message: 'Internal server error', status: 'fail' });
    }
  };
  
  module.exports = { login };