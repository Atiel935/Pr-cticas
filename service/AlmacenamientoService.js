const  Almacenamiento  = require('../models/Almacenamiento');

exports.obtenerAlmacenamiento = async () => {
  try {
    const registros = await Almacenamiento.findAll();
    return registros;
  } catch (error) {
    throw new Error('Error al obtener los registros de almacenamiento');
  }
};

exports.crearAlmacenamiento = async (registroData) => {
  try {
    const registro = await Almacenamiento.create(registroData);
    return registro;
  } catch (error) {
    throw new Error('Error al crear el registro de almacenamiento');
  }
};

exports.actualizarAlmacenamiento = async (id, registroData) => {
  try {
    await Almacenamiento.update(registroData, { where: { id } });
    return true;
  } catch (error) {
    throw new Error('Error al actualizar el registro de almacenamiento');
  }
};

exports.eliminarAlmacenamiento = async (id) => {
  try {
    await Almacenamiento.destroy({ where: { id } });
    return true;
  } catch (error) {
    throw new Error('Error al eliminar el registro de almacenamiento');
  }
};
