const router = require('express').Router();
const { AuthToken, Admin} = require('../middleware/checkAuth');

const {  
    productoId,
    regProducto,   
    getProducto,
    getIdProducto,
    deleteProducto,
    updateProducto, imagen  } = require('../controllers/producto_controller');

    //Middleware  - Router
router.param('productoId', productoId);

//Rutas
router.post('/producto', AuthToken, Admin, regProducto);
router.get('/producto', getProducto);
router.get('/producto/:productoId', getIdProducto);
router.delete('/producto/:productoId', AuthToken, Admin, deleteProducto);
router.get('/producto/imagen/:productoId', imagen);
router.put('/producto/:id', AuthToken, Admin, updateProducto);


module.exports = router;