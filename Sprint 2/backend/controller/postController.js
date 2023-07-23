const Post = require('../models/post');
const User = require('../models/user');

const getCandidatesByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                status: 'failed',
                message: 'Post not found',
            });
        }

        res.status(200).json({
            success: true,
            status: 'success',
            data: {
                candidates: post.candidates,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            status: 'failed',
            message: error,
        });
    }

};

const getPostsByCompany = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const posts = await Post.find({ company: companyId });

        res.status(200).json({
            success: true,
            status: "success",
            data: {
                posts,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            status: "Failed to fetch posts",
            message: error,
        });
    }

};

const addSelectedCandidate = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $addToSet: { selectedCandidates: req.params.userId },
                $pull: { candidates: req.params.userId },
            },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            success: true,
            status: 'success',
            data: {
                post,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            status: 'fail',
            message: error,
        });
    }

};

const getSelectedCandidates = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).select('selectedCandidates');
        if (!post) {
            return res.status(404).json({
                success: false,
                status: 'fail',
                message: 'Post not found',
            });
        }

        const selectedCandidateObjects = await User.find({
            _id: { $in: post.selectedCandidates },
        });

        res.status(200).json({
            success: true,
            status: 'success',
            data: {
                selectedCandidates: selectedCandidateObjects,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            status: 'fail',
            message: error,
        });
    }

};


module.exports = {getCandidatesByPostId, getPostsByCompany, addSelectedCandidate, getSelectedCandidates};