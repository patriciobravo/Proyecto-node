const ModelUsuarios = require('../models/usuario_model');
const bcrypt = require('bcrypt');

function errorHandler(data, next, err = null){

    if(err){
      return next(err);
    }
  
    if(!data){
  
      let error = new Error('No existe !');
      error.statusCode = 404;
      return next(error)
      
    }
  }

function usuarioId(req, res, next, id) {
  console.log('aqui')

  const Request = ModelUsuarios.findById(id);

  Request
  // .select('-imagen')
  .exec( (err, DocUsuario) => {

    if( err || !DocUsuario  ) return errorHandler(DocUsuario, next, err)
    //cargamos en el request [docProducto]
    req.DocUsuario = DocUsuario;
    console.log(req.DocUsuario)
    next();

  })
}

//Guardar producto
function regProducto(req, res, next){

  let data = {
    ProductoNom : req.body.ProductoNom,
    precio : req.body.precio,
    stock : req.body.stock,
    vendidos : req.body.vendidos,
    producto_tipo : req.body.producto_tipo
  }

  const modelProducto = new ModelProducto(data);

  if(req.files){

    modelProducto.imagen.data = req.files.imagen.data;
    modelProducto.imagen.contentType = req.files.imagen.mimetype;
  }
  modelProducto.save( (err, DocProducto) => {

    if( err || !DocProducto  ) return errorHandler(DocProducto, next, err)

    DocProducto = DocProducto.toObject();
    delete DocProducto.imagen;

    return res.json({
      data: DocProducto
    })
  })
}

//Listar productos
function getUsuarios(req, res,next) {
  
  

    ModelUsuarios.find().exec( (err, items) =>{
    
    if( err || !items  ) 
    
    return errorHandler(items, next, err)

    return res.json({
      items: items
    })

  } )
}
  
//Listar tipo de productos por id
function getIdUsuario(req, res, next) {
  
    let id = req.DocUsuario;  

    ModelUsuarios.findById( id, (err, DocUsuario) =>{
  
      if( err || !DocUsuario  ) return errorHandler(DocUsuario, next, err)
  
      return res.json({
        data: DocUsuario
      })
    });
}

//Eliminar tipo de productos por id
function deleteUsuario(req, res, next){
  
  const id = req.params.id;
  console.log(req.params.id)
  ModelUsuarios.findByIdAndRemove( id, (err, DocUsuario) => {

    if( err || !DocUsuario  ) return errorHandler(DocUsuario, next, err)

    return res.json({
      data: DocUsuario
    })
  })
  
}

//Actualizar tipo de producto
async function updateUsuario(req, res,next){
  console.log('aqui en up')

  const salt = bcrypt.genSaltSync();
  console.log(salt)


  //const checkEmail =  await ModelUsuarios.findOne({ email: req.body.email });
  //await console.log( 'gffg',checkEmail)

  //if (checkEmail) return res.status(400).json({ error: true, message: 'email ya existe' });

  const password = await bcrypt.hash(req.body.password, salt);

  const id = req.DocUsuario._id;
  console.log(id)
  const user = {
    name: req.body.name,
    email: req.body.email,
    password,
    perfil: req.body.perfil
  }

  ModelUsuarios.findByIdAndUpdate(
    id, 
    user,
    { new : true},
    (err, DocUsuario) =>{
      if( err || !DocUsuario  ) return errorHandler(DocUsuario, next, err)

      return res.json({
        items: DocUsuario
      })
    }
  )

}


module.exports = {
  usuarioId,
  regProducto,
  getUsuarios,
  getIdUsuario,
  deleteUsuario,
  updateUsuario
  
}
  
  