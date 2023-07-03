const express = require('express')
const router = express.Router()

// Controller
const { register, login, getCurrentUser } = require('../controller/UserController')

// Middlewares
const validate = require('../middlewares/handleValidation')
const {
    userCereateValidation,
    loginValidation
} = require('../middlewares/userValidations')
const authGuard = require('../middlewares/authGuard')

// Routes
router.post('/register', userCereateValidation(), validate, register)
router.post('/login', loginValidation(), validate, login)
router.get('/profile', authGuard, getCurrentUser)

module.exports = router