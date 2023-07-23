const express = require('express')
const router_signUp = express.Router()

const SignUpController = require('../controller/signUpController')

router_signUp
    .route('/')
    .post(SignUpController.createUsers) //done


module.exports = router_signUp