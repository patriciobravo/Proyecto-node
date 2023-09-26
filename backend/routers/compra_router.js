//const express = require('express');
//const { isAuth } = require('../../middleware/auth');

const router = require('express').Router();
const { 
    generarCompra,
    listarCompras,
    Compras
} = require('../controllers/compra_controller');

//Rutas
router.get('/compra/:id', generarCompra);
router.get('/compras/listar/:idUsuario', listarCompras);
router.get('/compras', Compras);



module.exports = router;