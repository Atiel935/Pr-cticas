const { Proveedores } = require('../models/Proveedores');

exports.obtenerProveedores = async () => {
  try {
    const proveedores = await Proveedores.findAll();
    return proveedores;
  } catch (error) {
    throw new Error('Ocurrió un error al obtener los proveedores');
  }
};

exports.obtenerProveedorPorId = async (id) => {
  try {
    const producto = await Proveedores.findByPk(id);
    if (!producto) {
      throw new Error('Proveedor no encontrado');
    }
    return producto;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el proveedor');
  }
};

exports.crearProveedor = async (proveedorData) => {
  try {
    const nuevoProveedor = await Proveedores.create(proveedorData);
    return nuevoProveedor;
  } catch (error) {
    throw new Error('Ocurrió un error al crear el proveedor');
  }
};

exports.actualizarProveedor = async (id, proveedorData) => {
  try {
    const proveedor = await Proveedores.findByPk(id);

    if (!proveedor) {
      throw new Error('Proveedor no encontrado');
    }

    proveedor.nombre_proveedor = proveedorData.nombre_proveedor;
    proveedor.direccion = proveedorData.direccion;
    proveedor.telefono = proveedorData.telefono;

    await proveedor.save();

    return proveedor;
  } catch (error) {
    throw new Error('Ocurrió un error al actualizar el proveedor');
  }
};

exports.eliminarProveedor = async (id) => {
  try {
    const proveedor = await Proveedores.findByPk(id);

    if (!proveedor) {
      throw new Error('Proveedor no encontrado');
    }

    await proveedor.destroy();

    return true;
  } catch (error) {
    throw new Error('Ocurrió un error al eliminar el proveedor');
  }
};
