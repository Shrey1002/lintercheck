const express = require('express');
const userRouter = express.Router();

const userController = require('../controller/usersController');

userRouter
    .route('/:id')    
    .get(userController.getUser)    
    .patch(userController.updateUser);
    

userRouter.get('/Users/:userId', userController.getUserById);

userRouter.patch('/:userId/update', userController.updateUser);

module.exports = userRouter;