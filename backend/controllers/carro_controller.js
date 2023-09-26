const ModelProducto = require('../models/producto_models');
const ModelUsuarios = require('../models/usuario_model');
//const ModelCarro = require('../models/carro_model');


const addCarro = async (req, res, next) => {

  let productId = req.body.productId;
  let usuarioId = req.body.usuarioId;
  const cantidadNueva = req.body.cantProducto
  console.log(productId)
  console.log(cantidadNueva)

  try {
    DocProducto = await ModelProducto.findById(productId).exec()
    
    if(!DocProducto){
      err =  new Error('No Existe')
      err.statusCode = 404;
      throw(err);
    }
    
    DocUsuario = await ModelUsuarios.findById(usuarioId).exec();
    
   // const cantidadNueva = 2;
    //TODO borrar
    DocUsuario = await DocUsuario.addCarro(DocProducto,cantidadNueva);
   
    res.json(
      DocUsuario.cart
    )


  } catch (error) {
    next(error);
  }

  
  DocUsuario = await ModelUsuarios.find

  

}

const listarCarro = async (req, res)=>{

  console.log('listarCarro');
  //TODO borrar
 await  ModelUsuarios.findById(req.params.id, 'cart').
    populate('cart.items.productId','-imagen').exec( (err, data) => {
    if(err){
      return res.json(err);
    }

    return res.json(
      data.cart
    )
  });

  //callbaks -> 

  //==========
  // callbaks
  // 1	ModelUsuario.findById(req.params.id , (err, data) => { data }
  // exec
  //  1 Promesa -  ModelUsuario.findById(req.params.id).exec()
  //            doc = await ModelUsuario.findById(req.params.id).exec()
  // exec
  // 2 Callback  - ModelUsuario.findById(req.params.id).exec( (err, data) => { data }
  //       
  //==========



}

const limpiarCarro = async (req, res) => {

  let DocUsuario = await ModelUsuarios.findById(req.params.id).exec()
  console.log('before clear cart docUsuario:',DocUsuario);

  DocUsuario = await DocUsuario.LimpiarCarrito();
  console.log('after clear cart docUsuario:',DocUsuario);

  return res.json(DocUsuario)
}

// Eliminar 1 Producto Carro
const eliminarProdCarrito = async (req, res, next) => {
  console.log('aqui')

  let productId = req.body.productId;
  let usuarioId = req.body.usuarioId;

  try {
      
      DocProducto = await ModelProducto.findById(productId).exec();
      console.log(DocProducto)
  
      if(!DocProducto){
          err = new Error('No existe')
          err.statusCode = 404;
          throw(err)
      }

      DocUsuario = await ModelUsuarios.findById(usuarioId).exec();
      DocUsuario = await DocUsuario.deleteProdCarro(DocProducto);

      res.json(DocUsuario)

  }catch (error) {

     next(error);
      
  }



 
}


module.exports = {
  addCarro,
  listarCarro,
  limpiarCarro,
  eliminarProdCarrito
  }