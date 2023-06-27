const {Proveedores} = require('../models');

exports.obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedores.findAll();
    res.json(proveedores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al obtener los proveedores' });
  }
};

exports.crearProveedor = async (req, res) => {
  try {
    const { nombre_proveedor, direccion, telefono } = req.body;
    const nuevoProveedor = await Proveedores.create({
      nombre_proveedor,
      direccion,
      telefono
    });
    res.json(nuevoProveedor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al crear el proveedor' });
  }
};

exports.actualizarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_proveedor, direccion, telefono } = req.body;
    const proveedor = await Proveedores.findByPk(id);

    if (!proveedor) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    proveedor.nombre_proveedor = nombre_proveedor;
    proveedor.direccion = direccion;
    proveedor.telefono = telefono;

    await proveedor.save();

    res.json(proveedor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al actualizar el proveedor' });
  }
};

exports.eliminarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedor = await Proveedores.findByPk(id);

    if (!proveedor) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    await proveedor.destroy();

    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al eliminar el proveedor' });
  }
};

exports.obtenerProveedorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedor = await Proveedores.findByPk(id);
    
    if (!proveedor) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    res.json(proveedor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al obtener el proveedor' });
  }
};
