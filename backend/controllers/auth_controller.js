const ModelUsuario = require('../models/usuario_model');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// function errorHandler(data, next, err = null){

//     if(err){
//       return next(err);
//     }
  
//     if(!data){
  
//       let error = new Error('No existe !');
//       error.statusCode = 404;
//       return next(error)
      
//     }
// }


const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    perfil: Joi.string().min(5).max(1024).required(),
});


async function register(req, res) {

    const salt = bcrypt.genSaltSync();

    // const { error } = schemaRegister.validate(req.body)

    // if (error) {
    //     return res.status(400).json({ error: error.details[0].message });
    // }

    //verificar si existe email antes de registrar
    const checkEmail = await ModelUsuario.findOne({ email: req.body.email });
    console.log(req.body.password)

    if (checkEmail) return res.status(400).json({ error: true, message: 'email ya existe' });

    //hash password
    const password = await bcrypt.hash(req.body.password, salt);



    const user = new ModelUsuario({
        name: req.body.name,
        email: req.body.email,
        password,
        perfil: req.body.perfil
    })

    try {

        const userDB =  await user.save();

        res.json({
            error: null,
            data: userDB,

        })
    } catch (error) {
        res.status(404).json(error)
    }

}

async function login(req, res) {

    const schemaLogin = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    });

    const { error } = schemaLogin.validate(req.body);

    if (error) { return res.status(400).json({ error: error.details[0].message }); }

    //verificar si existe usuario 
    const userLogin = await ModelUsuario.findOne({ email: req.body.email });
    if (!userLogin) return res.status(400).json({ error: true, message: 'Email no registrado' });

    //Verificar si contraseña es correcta
    const passValidate = await bcrypt.compare(req.body.password, userLogin.password);
    if (!passValidate) return res.status(400).json({ error: 'contraseña no válida' });
    let payload = {
        usuarioId: userLogin._id,
        name: userLogin.name,
        perfil: userLogin.perfil
      }

      const  token = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.CADUCIDAD_TOKEN, }
      )
    const perfil = userLogin.perfil
    const name = userLogin.name

    res.header('auth-token', token).json({
        error: null,
        data: { token, perfil, name, payload }
    })

}

module.exports = { register, login }