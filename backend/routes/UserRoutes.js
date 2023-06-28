const express = require('express')
const router = express.Router()

// Controller
const { register } = require('../controller/UserController')

// Middlewares
const validate = require('../middlewares/handleValidation')
const { userCereateValidation } = require('../middlewares/userValidations')

// Routes
router.post('/register', userCereateValidation(), validate, register)

module.exports = router