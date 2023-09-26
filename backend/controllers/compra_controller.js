const ModelUsuarios = require('../models/usuario_model');
const ModelCompra = require('../models/compra_model');



const generarCompra = async (req, res, next) => {
    console.log('aqui')

  let id = req.params.id;

  try {
    let DocUsuario = await ModelUsuarios.findById(id).exec();

    let data = {
      usuario: {
        nombre: DocUsuario.name,
        email: DocUsuario.email,
        userId: DocUsuario._id
      } 
    }

    let docCompra = await new ModelCompra(data);
    docCompra.generarCompra(DocUsuario);

    res.json(docCompra);

  } catch (error) {
    next(error);
  }
 }


 //TODO Borrar
const listarCompras = async (req, res, next) => {

  let idUsuario = req.params.idUsuario;

  try {
    let docCompra = await ModelCompra.find({ 'usuario.userId': idUsuario }, '-productos.producto.imagen').exec();
    
    res.json(docCompra);

  } catch (error) {
    next(error);
  }



}

const Compras = async (req, res, next) => {

  try {
    let docCompra = await ModelCompra.find().exec();
    
    res.json(docCompra);

  } catch (error) {
    next(error);
  }



}




module.exports ={
    generarCompra,
    listarCompras,
    Compras

}