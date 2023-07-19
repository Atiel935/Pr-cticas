const { Administrador } = require('../models');
const { generarToken, validarContrasena } = require('../models/Administrador');

// Función para iniciar sesión
const iniciarSesion = async (req, res) => {
  const { correo_admin, contrasena } = req.body;

  try {
    // Buscar el administrador por su correo
    const administrador = await Administrador.findOne({ where: { correo_admin } });

    if (!administrador) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const contrasenaValida = await validarContrasena(contrasena, administrador.contrasena);

    if (!contrasenaValida) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar el token JWT
    const token = generarToken({ id_admin: administrador.id_admin });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


const crearAdministrador = async (administradorData) => {
  try {
    // Verificar si ya existe un administrador con el mismo correo
    const administradorExistente = await Administrador.findOne({
      where: { correo_admin: administradorData.correo_admin },
    });

    if (administradorExistente) {
      throw new Error('Ya existe un administrador con ese correo');
    }

    // Generar el hash de la contraseña
    const contrasenaHash = await bcrypt.hash(administradorData.contrasena, 10);

    // Crear el administrador en la base de datos
    const nuevoAdministrador = await Administrador.create({
      nombre_admin: administradorData.nombre_admin,
      correo_admin: administradorData.correo_admin,
      contrasena: contrasenaHash,
      nivel_acceso: administradorData.nivel_acceso,
    });

    return nuevoAdministrador;
  } catch (error) {
    throw new Error('Error al crear el administrador');
  }
};

const eliminarAdministrador = async (id) => {
  try {
    // Verificar si el administrador existe
    const administrador = await Administrador.findByPk(id);

    if (!administrador) {
      throw new Error('No se encontró el administrador');
    }

    // Eliminar el administrador de la base de datos
    await administrador.destroy();

    return true;
  } catch (error) {
    throw new Error('Error al eliminar el administrador');
  }
};

const modificarAdministrador = async (id, administradorData) => {
  try {
    // Verificar si el administrador existe
    const administrador = await Administrador.findByPk(id);

    if (!administrador) {
      throw new Error('No se encontró el administrador');
    }

    // Generar el hash de la nueva contraseña si se proporciona
    let contrasenaHash = administrador.contrasena;

    if (administradorData.contrasena) {
      contrasenaHash = await bcrypt.hash(administradorData.contrasena, 10);
    }

    // Actualizar los datos del administrador en la base de datos
    await administrador.update({
      nombre_admin: administradorData.nombre_admin,
      correo_admin: administradorData.correo_admin,
      contrasena: contrasenaHash,
      nivel_acceso: administradorData.nivel_acceso,
    });

    return administrador;
  } catch (error) {
    throw new Error('Error al modificar el administrador');
  }
};

const buscarAdministradorPorId = async (id) => {
  try {
    // Buscar el administrador por su ID
    const administrador = await Administrador.findByPk(id);

    if (!administrador) {
      throw new Error('No se encontró el administrador');
    }

    return administrador;
  } catch (error) {
    throw new Error('Error al buscar el administrador');
  }
};

module.exports = {
  generarToken,
  validarContrasena,
  crearAdministrador,
  eliminarAdministrador,
  modificarAdministrador,
  buscarAdministradorPorId,
  iniciarSesion
};
