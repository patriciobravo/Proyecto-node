//const { Router } = require('express');
const { validateSingUp } = require('../validators/auth');

const router = require('express').Router();

const { register, login } = require('../controllers/auth_controller');



//Rutas
router.post('/register',validateSingUp, register);
router.post('/login', login);


module.exports = router;