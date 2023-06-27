const { Almacenamiento } = require('../models');

// Controller to get all almacenamiento records
exports.obtenerAlmacenamiento = async (req, res) => {
  try {
    const registros = await Almacenamiento.findAll();
    res.json(registros);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al obtener los registros de almacenamiento' });
  }
};

// Controller to create a new almacenamiento record
exports.crearAlmacenamiento = async (req, res) => {
  try {
    const { id_producto, fecha_entrada, cantidad_almacenada, ubicacion } = req.body;
    const registro = await Almacenamiento.create({
      id_producto,
      fecha_entrada,
      cantidad_almacenada,
      ubicacion
    });
    res.json(registro);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al crear el registro de almacenamiento' });
  }
};

// Controller to update an existing almacenamiento record
exports.actualizarAlmacenamiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_producto, fecha_entrada, cantidad_almacenada, ubicacion } = req.body;
    await Almacenamiento.update(
      {
        id_producto,
        fecha_entrada,
        cantidad_almacenada,
        ubicacion
      },
      { where: { id } }
    );
    res.json({ mensaje: 'Registro de almacenamiento actualizado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al actualizar el registro de almacenamiento' });
  }
};

// Controller to delete an almacenamiento record
exports.eliminarAlmacenamiento = async (req, res) => {
  try {
    const { id } = req.params;
    await Almacenamiento.destroy({ where: { id } });
    res.json({ mensaje: 'Registro de almacenamiento eliminado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al eliminar el registro de almacenamiento' });
  }
};
