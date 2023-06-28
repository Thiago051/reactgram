const express = require('express')
const router = express.Router()

// Controller
const { register, login } = require('../controller/UserController')

// Middlewares
const validate = require('../middlewares/handleValidation')
const {
    userCereateValidation,
    loginValidation
} = require('../middlewares/userValidations')

// Routes
router.post('/register', userCereateValidation(), validate, register)
router.post('/login', loginValidation(), validate, login)

module.exports = router