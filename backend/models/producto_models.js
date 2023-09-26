var mongoose = require('mongoose');
const ModelTipoProducto = require('./tipo_producto_model');

const validate_tipoProducto = async (val) =>{
  let response = await ModelTipoProducto.exists(
    { tipo_ProductosNom : val }
  );

  return response;
  
}
var Schema = mongoose.Schema;
const schemaProducto = new Schema({
  ProductoNom: {
    type: String,
    required: true,
    unique: true
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: 'Stock Requerido'
  },
  vendidos: {
    type: Number,
    default: 0
  },
  producto_tipo: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  }
  ,
//   producto_tipo: {
//     type: String,
//     required: true,
//   },
  imagen: {
    data: Buffer,
    contentType: String 
  },
}, 
{
    timestamps: true
});

schemaProducto.path('producto_tipo').validate(
  {
    validator: validate_tipoProducto,
    message : 'Tipo de producto no Existe!'
  }
);


const model = mongoose.model('ModelProducto', schemaProducto);

module.exports = model;