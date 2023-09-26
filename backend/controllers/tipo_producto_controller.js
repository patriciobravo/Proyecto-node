const ModelTipoProducto = require('../models/tipo_producto_model');

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

//Guardar tipo de producto
function regTipoProducto(req, res, next){

  let data = {
    tipo_ProductosNom: req.body.tipo_ProductosNom
  }

  const modelTipoProducto = new ModelTipoProducto(data);
  modelTipoProducto.save( (err, DoctipoProducto) => {

    if( err || !DoctipoProducto  ) return errorHandler(DoctipoProducto, next, err)

    return res.json({
      data: DoctipoProducto
    })
    

    
    
    
  })


 
}

//Listar Tipo de productos
function getTipoProducto(req, res) {
  
  ModelTipoProducto.find().exec( (err, items) =>{
    
    if( err || !items  ) 
    
    return errorHandler(items, next, err)

    return res.json({
      items: items
    })

  } )
  
  

}
  
//Listar tipo de productos por id
function getIdTipoProducto(req, res) {

  let id = req.params.id;  

  ModelTipoProducto.findById( id, (err, doctipoProducto) =>{

    if( err || !doctipoProducto  ) return errorHandler(doctipoProducto, next, err)

    return res.json({
      data: doctipoProducto
    })
  });
}

//Eliminar tipo de productos por id
function deleteTipoProducto(req, res){
  
  const id = req.params.id;
  console.log(id)
  ModelTipoProducto.findByIdAndRemove( id, (err, doctipoProducto) => {

    if( err || !doctipoProducto  ) return errorHandler(doctipoProducto, next, err)

    return res.json({
      data: doctipoProducto
    })
  })
}


//Actualizar tipo de producto
function updateTipoProducto(req, res,next){

  const id = req.params.id;

  const data = {
    tipo_ProductosNom: req.body.tipo_ProductosNom
  }

  ModelTipoProducto.findByIdAndUpdate(id, { tipo_ProductosNom: req.body.tipo_ProductosNom}, { new: true },  
      (err, doctipoProducto) => {

    if( err || !doctipoProducto  ) return errorHandler(doctipoProducto, next, err)

    return res.json({
      data: doctipoProducto
    })
    
  })

}


module.exports = {
  getIdTipoProducto,
  regTipoProducto,
  getTipoProducto,
  deleteTipoProducto,
  updateTipoProducto
  
}
  
  