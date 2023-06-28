const express = require('express')
const router = express.Router()

// Controller
const { register } = require('../controller/UserController')

// Routes
router.post('/register', register)

module.exports = router