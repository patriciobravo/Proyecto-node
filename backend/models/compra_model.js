
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schemaCompra = new Schema({
  usuario: {
    nombre: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  productos: [{
    producto: {
      type: Object,
      required: true
    },
    cantidad: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  fecha_compra: {
    type: Date,
    required: true,
    default: Date.now
  }
});


schemaCompra.methods.generarCompra = async function(DocUsuario){

  DocUsuario = await DocUsuario.populate('cart.items.productId' ,'-stock -vendidos').execPopulate();

  //console.log('DocUsuario:',DocUsuario);
  
  let total = 0;

  let producto = DocUsuario.cart.items.map( item => {
   // console.log('item.productId._doc:',item.productId._doc);
    
    total += item.cantidad * item.productId._doc.precio;
console.log(total)
    return {
      producto : item.productId._doc,
      cantidad: item.cantidad
    }

  })
  console.log('producto:',producto);
  
  this.productos = producto;
  this.total = total;

  await this.save();
  await DocUsuario.LimpiarCarrito();
  return this;

}

const model = mongoose.model('modelCompra', schemaCompra);

module.exports = model;