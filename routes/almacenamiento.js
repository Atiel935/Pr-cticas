const express = require('express');
const router = express.Router();
const almacenamientoController = require('../controller/AlmacenamientoController');

// Get all almacenamiento records
router.get('/', almacenamientoController.obtenerAlmacenamiento);

// Create a new almacenamiento record
router.post('/', almacenamientoController.crearAlmacenamiento);

// Update an existing almacenamiento record
router.put('/:id', almacenamientoController.actualizarAlmacenamiento);

// Delete an almacenamiento record
router.delete('/:id', almacenamientoController.eliminarAlmacenamiento);

module.exports = router;
