const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    postTitle: {
        type: String,
    },
    postDescription: {
        type: String,
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    postLocation: {
        type: String,
    },
    candidatesApplied: [],
    selectedCandidates: [],
    postCompany: {
        type: String
    },
    postId: {
        type: String,
        default: ""
    }
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;