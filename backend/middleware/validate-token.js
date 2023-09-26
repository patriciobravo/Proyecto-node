//Middleware
const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({ error: 'token no es válido' })
    }
}

const isAdmin = (req, res, next) => {

    let usuario = req.usuario;
  
    if(usuario.role === 'ADMIN_ROLE'){
      next();
    }else{
      let err = new Error('Rol no valido');
      err.statusCode = 401;
      next(err)
    }
  
  
  }

module.exports = verifyToken;