const router = require('express').Router();
const { AuthToken, Admin} = require('../middleware/checkAuth');

const {  
    getIdTipoProducto,
    regTipoProducto, 
    getTipoProducto, 
    deleteTipoProducto,
    updateTipoProducto  } = require('../controllers/tipo_producto_controller');

//Rutas
router.get('/tipo_producto/:id', getIdTipoProducto);
router.post('/tipo_producto', AuthToken, Admin, regTipoProducto);
router.get('/tipo_producto', getTipoProducto);
router.delete('/tipo_producto/:id', AuthToken, Admin, deleteTipoProducto);
router.put('/tipo_producto/:id', AuthToken, Admin, updateTipoProducto);


module.exports = router;