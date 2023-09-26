const ModelProducto = require('../models/producto_models');

function errorHandler(data, next, err = null){

    if(err){
      return next(err);
    }
  
    if(!data){
  
      let error = new Error('Producto no existente!');
      error.statusCode = 404;
      return next(error)
      
    }
}


const imagen = (req, res) =>{

   

  res.set('Content-Type', req.DocProducto.imagen.contentType);
  res.set('xxxxx', 'aaaaabb');

  return res.send(req.DocProducto.imagen.data);
  
}


function productoId(req, res, next, id) {


  const Request = ModelProducto.findById(id);

  Request
  // .select('-imagen')
  .exec( (err, DocProducto) => {

    if( err || !DocProducto  ) return errorHandler(DocProducto, next, err)
    //cargamos en el request [docProducto]
    req.DocProducto = DocProducto;
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
    producto_tipo: req.body.producto_tipo,
    imagen: req.body.imagen,
    estado: req.body.estado
  }
  console.log(data)
 

  const modelProducto = new ModelProducto(data);

  if (req.files) {

    console.log(req.files);
    console.log('aqui')
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
function getProducto(req, res,next) {
  
  const Request = ModelProducto.find();

  Request
    .select('-imagen')
    .exec( (err, items) =>{
    
    if( err || !items  ) return errorHandler(items, next, err)

    return res.json({
      items
    })
  })
}
  
//Listar tipo de productos por id
function getIdProducto(req, res) {
  
  return res.json({
    data : req.DocProducto
  })
}

//Eliminar tipo de productos por id
function deleteProducto(req, res){
  
  const id = req.DocProducto;
  ModelProducto.findByIdAndRemove( id, (err, DocProducto) => {

    if( err || !DocProducto  ) return errorHandler(DocProducto, next, err)

    return res.json({
      data: DocProducto
    })
  })
  
}

//Actualizar tipo de producto
function updateProducto(req, res,next){

  const id = req.params.id;

  ModelProducto.findByIdAndUpdate(
    id, 
    req.body ,
    { new : true},
    (err, DocProducto) =>{
      if( err || !DocProducto  ) return errorHandler(DocProducto, next, err)

      return res.json({
        items: DocProducto
      })
    }
  )

}


module.exports = {
  productoId,
  regProducto,
  getProducto,
  getIdProducto,
  deleteProducto,
  updateProducto,
  imagen
  
}
  
  