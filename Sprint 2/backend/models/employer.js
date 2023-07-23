const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    maxlength: 30,
    minlength: 7,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;