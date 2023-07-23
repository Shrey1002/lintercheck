const express = require('express');
const postRouter = express.Router();

const postController = require('./../controller/postsController');

postRouter
    .route('/company/:companyId')
    .get(postController.getPostsByCompany);

postRouter
    .route('/:postId/candidates')
    .get(postController.getCandidatesByPostId);

postRouter.patch('/Posts/:postId/selectCandidate/:userId', postController.addSelectedCandidate);

postRouter.get('/:postId/selectedCandidates', postController.getSelectedCandidates);

module.exports = postRouter;
