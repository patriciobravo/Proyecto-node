const authUser = require('./auth_router');
const tipoProducto = require('./tipo_producto_router');
const Producto = require('./producto_router');
const Usuarios = require('./usuarios_router');
const Carro = require('./carro_router');
const Compras = require('./compra_router');
module.exports = (app) => {
    app.use('/api', authUser);
    app.use('/api',Usuarios);
    app.use('/api',tipoProducto);
    app.use('/api', Producto);
    app.use('/api', Carro);
    app.use('/api', Compras);
}
