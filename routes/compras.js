const express = require('express');
const comprasController = require('../controller/ComprasController');

const router = express.Router();

router.get('/', comprasController.obtenerCompras);
router.get('/:id', comprasController.obtenerCompraPorId);
router.post('/', comprasController.crearCompra);
router.put('/:id', comprasController.actualizarCompra);
router.delete('/:id', comprasController.eliminarCompra);
//router.get('/report', comprasController.generaReporte);

module.exports = router;
