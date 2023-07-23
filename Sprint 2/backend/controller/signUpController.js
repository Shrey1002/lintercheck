const Candidate = require('../models/candidate');
const Employer = require('../models/employer');

const candidateSignup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
  
    try {
      // Check if a candidate with the same email already exists
      const existingCandidate = await Candidate.findOne({ email });
  
      if (existingCandidate) {
        return res.status(409).json({
            message: 'Candidate already exists',
            sucess: false,
            value: existingCandidate,
            Recevied: req.body});
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new candidate instance
      
      const candidate = new Candidate({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        phone,
      });
  
      // Save the candidate to the database
      await candidate.save();
  
      // Return a success response
      return res.status(201).json({ message: 'Candidate created successfully', candidate });
    } catch (error) {
      console.error('Error during candidate signup:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const createUser = async (req, res) => {


    try {
        const { email } = req.body;
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "E-mail already exists",
                value: userExist,
                Received: req.body
            });
        }

        if (req.body.company) {
            const { company } = req.body;
            const companyExist = await User.findOne({ company })
            if (companyExist) {
                return res.status(400).json({
                    success: false,
                    message: "company already exists",
                    value: { company },
                    Received: req.body
                })
            }
        }

        const userDetails = req.body;

        const collectionSize = (await User.collection.stats()).size.toString()

        if (userDetails.User_type == "Company") {
            userDetails._id = userDetails.company + collectionSize;
        }
        else {
            userDetails._id = userDetails.name + "-" + userDetails.lastname + collectionSize
        }

        const newUser = await User.create(userDetails)
        
        await newUser.save();

        res.status(200).json({
            success: true,
            status:'success',
            value:newUser,
        })

    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ success: false, message: 'Internal server error', status: 'fail' });
    }

};