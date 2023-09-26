const jwt = require('jsonwebtoken');

const AuthToken = (req, res, next) =>{
 

  const token = req.get('auth-token');

  //console.log('Header token:',token);
  

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) =>{
    if(err){
      err.statusCode = 401;
    
      next(err);
    }

   // console.log('decoded:',decoded);

    req.usuario = decoded;
        
    next();

  });

}

const Admin = (req, res, next) => {

  let usuario = req.usuario;
  console.log(usuario.perfil)

  if(usuario.perfil === 'Admin'){
    next();
  }else{
    let err = new Error('Acceso Denegado');
    err.statusCode = 401;
    next(err)
  }


}

const renewToken = async (req, res = response) => {
  console.log('renewToken ----------------');
  
  console.log('req.usuario:', req.usuario);
  
  const uid = req.usuario.uid;
  let {iat, exp,...payload} = req.usuario;


  let token = jwt.sign(
    payload,
    process.env.TOKEN_KEY,
    { expiresIn: process.env.CADUCIDAD_TOKEN, }
  )


  res.json({
    token
  
  });

}



module.exports = {
  AuthToken,
  Admin,
  renewToken
}