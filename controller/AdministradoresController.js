const administrador = require('../models/Administrador');

exports.createAdministrador = async (req, res) => {
  try {
    const administrador = await administrador.createAdministrador(req.body);
    res.status(201).json(administrador);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdministradores = async (req, res) => {
  try {
    const administradores = await administrador.getAdministradores();
    res.json(administradores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdministradorById = async (req, res) => {
  try {
    const administrador = await administrador.getAdministradorById(req.params.id);
    if (!administrador) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }
    res.json(administrador);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAdministrador = async (req, res) => {
  try {
    const administrador = await administrador.updateAdministrador(req.params.id, req.body);
    res.json(administrador);
  } catch (error) {
    if (error.message === 'Administrador no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAdministrador = async (req, res) => {
  try {
    await administrador.deleteAdministrador(req.params.id);
    res.status(204).end();
  } catch (error) {
    if (error.message === 'Administrador no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo_admin, contrasena } = req.body;
    const administrador = await administrador.getAdministradorByCredentials(correo_admin, contrasena);

    if (!administrador) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Genera un token de autenticación usando la clave secreta
    const token = administrador.generateAuthToken(administrador.id_admin);

    res.json({ message: 'Autenticación exitosa', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error en la autenticación' });
  }
};
