var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var schemaCarro = new Schema({

    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'ModelUsuario'
    },
    cart: {
        items: [{
          productId: {
            type: Schema.Types.ObjectId,
            ref: 'modelProducto'
          },
          cantidad: {
            type: Number,
            required: true
          },
          total: {
            type: Number,
            required: true
          }
        }]
      }
});

schemaCarro.methods.addCarro = function(DocProducto){
  //console.log(DocProducto)
  console.log(this.cart.items)

  let index = this.cart.items.findIndex( item => {
    console.log(item.productId.toString())
    return item.productId.toString() == DocProducto._id.toString()
  });

  console.log('index:',index);

  let _cantidad = 1;
  let newCartItems = [...this.cart.items];

  //newCartItems[ 0, 1, 2]
  //delete newCartItems[1]
  //this.cart.items = newCartItems;
  //this.save();



  // if(index >= 0){
  //   _cantidad = this.cart.items[index].cantidad +1;
  //   newCartItems[index].cantidad = _cantidad;
  //   newCartItems[index].total = _cantidad * DocProducto.precio;
  // }else{
  //    newCartItems.push({
  //     productId : DocProducto._id,
  //     cantidad: _cantidad,
  //     total: DocProducto.precio
  //   })
  // }
  
 // this.cart.items = newCartItems;
  //return this.save();

}


const model = mongoose.model('ModelCarro', schemaCarro);

module.exports = model;