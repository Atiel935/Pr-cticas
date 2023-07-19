const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Administrador } = require('../models'); // Asegúrate de importar el modelo Administrador correctamente

const secretKey = '8yX9#pK$Jf@3'; // Clave secreta para JWT

const generarToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Configura el tiempo de expiración según tus necesidades
};

const validarContrasena = async (contrasena, contrasenaHash) => {
  return bcrypt.compare(contrasena, contrasenaHash);
};

const crearAdministrador = async (req, res) => {
  const { nombre_admin, correo_admin, contrasena, nivel_acceso } = req.body;

  try {
    // Verificar si ya existe un administrador con el mismo correo
    const administradorExistente = await Administrador.findOne({ where: { correo_admin } });

    if (administradorExistente) {
      return res.status(400).json({ message: 'Ya existe un administrador con ese correo' });
    }

    // Generar el hash de la contraseña
    const contrasenaHash = await bcrypt.hash(contrasena, 10);

    // Crear el administrador en la base de datos
    const nuevoAdministrador = await Administrador.create({
      nombre_admin,
      correo_admin,
      contrasena: contrasenaHash,
      nivel_acceso,
    });

    res.status(201).json({ message: 'Administrador creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const eliminarAdministrador = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si el administrador existe
    const administrador = await Administrador.findByPk(id);

    if (!administrador) {
      return res.status(404).json({ message: 'No se encontró el administrador' });
    }

    // Eliminar el administrador de la base de datos
    await administrador.destroy();

    res.json({ message: 'Administrador eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const modificarAdministrador = async (req, res) => {
  const { id } = req.params;
  const { nombre_admin, correo_admin, contrasena, nivel_acceso } = req.body;

  try {
    // Verificar si el administrador existe
    const administrador = await Administrador.findByPk(id);

    if (!administrador) {
      return res.status(404).json({ message: 'No se encontró el administrador' });
    }

    // Generar el hash de la nueva contraseña si se proporciona
    let contrasenaHash = administrador.contrasena;

    if (contrasena) {
      contrasenaHash = await bcrypt.hash(contrasena, 10);
    }

    // Actualizar los datos del administrador en la base de datos
    await administrador.update({
      nombre_admin,
      correo_admin,
      contrasena: contrasenaHash,
      nivel_acceso,
    });

    res.json({ message: 'Administrador modificado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const buscarAdministradorPorId = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el administrador por su ID
    const administrador = await Administrador.findByPk(id);

    if (!administrador) {
      return res.status(404).json({ message: 'No se encontró el administrador' });
    }

    res.json(administrador);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = {
  crearAdministrador,
  eliminarAdministrador,
  modificarAdministrador,
  buscarAdministradorPorId,
  generarToken,
  validarContrasena
};
