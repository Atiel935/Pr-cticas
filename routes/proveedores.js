const express = require('express');
const router = express.Router();
const proveedoresController = require('../controller/ProveedoresController');

router.get('/', proveedoresController.obtenerProveedores);
router.get('/:id', proveedoresController.obtenerProveedorPorId);
router.post('/', proveedoresController.crearProveedor);
router.put('/:id', proveedoresController.actualizarProveedor);
router.delete('/:id', proveedoresController.eliminarProveedor);

module.exports = router;
