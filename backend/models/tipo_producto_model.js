var mongoose = require('mongoose');

  const schemaTipoProducto = mongoose.Schema({

    tipo_ProductosNom: {
    type: String,
    required: true,
    unique: true
    
  }

});

const model = mongoose.model('ModelTipoProducto', schemaTipoProducto);

module.exports = model;
