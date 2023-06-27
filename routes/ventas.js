const express = require('express');
const ventasController = require('../controller/VentasController');

const router = express.Router();

router.get('/', ventasController.obtenerVentas);
router.get('/:id', ventasController.obtenerVentaPorId);
router.post('/', ventasController.crearVenta);
router.put('/:id', ventasController.actualizarVenta);
router.delete('/:id', ventasController.eliminarVenta);

module.exports = router;