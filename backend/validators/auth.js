const { body, validationResult } = require('express-validator');
const ModelUsuario = require('../models/usuario_model');

const paramRegister = [
  
  body('name').trim().not().isEmpty().withMessage('nombre requerido'),
  
  body('email').isEmail()
    .withMessage('ingrese un email valido')
    .custom( (value)=>{
      return ModelUsuario.findOne( {email:value} ).then( userDoc => {
        if(userDoc){
          return Promise.reject('Este correo ya existe')
        }
      } ) 
    } ),

  body('password').trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])/)
    .withMessage('debe tener numeros y caracteres minusculas y mayusculas y caracteres @$.!%*#?&')
    .isLength( {min:5} )
    .withMessage('minimo 5 caracteres')
];

const validateRegister = (req, res,next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    

    const error = new Error('Verificacion');
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
    
  }

  next();

}

const validateSingUp = [ paramRegister, validateRegister ];

module.exports = {
  validateSingUp
}