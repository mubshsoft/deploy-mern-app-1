const express = require('express');
const { signupValidations, loginValidations } = require('../middlewares/AuthValidation');
const { signUp, login } = require('../controllers/AuthController');
const router = express.Router();


router.post('/login', loginValidations, login)
router.post('/signup', signupValidations, signUp)

module.exports = router;