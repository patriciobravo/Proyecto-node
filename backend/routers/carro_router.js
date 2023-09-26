const router = require('express').Router();

const { addCarro, listarCarro, limpiarCarro, eliminarProdCarrito } = require('../controllers/carro_controller');



//Rutas
router.post('/addCarro', addCarro);
router.get('/carro/:id', listarCarro);
router.delete('/carro/:id', limpiarCarro);
router.put('/carro', eliminarProdCarrito);

module.exports = router;