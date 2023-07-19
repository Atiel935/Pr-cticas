const express = require('express');
const router = express.Router();
const administradorController = require('../controller/AdministradoresController');

// Ruta para crear un nuevo administrador
router.post('/', administradorController.crearAdministrador);
// Ruta para eliminar un administrador por su ID
router.delete('/:id', administradorController.eliminarAdministrador);

// Ruta para modificar un administrador por su ID
router.put('/:id', administradorController.modificarAdministrador);

// Ruta para buscar un administrador por su ID
router.get('/:id', administradorController.buscarAdministradorPorId);
// Ruta para iniciar sesion de un administrador por usuario y contraseña
//router.post('/login', administradorController.iniciarSesion);

module.exports = router;
