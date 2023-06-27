const Producto = require('../models/Productos');

const obtenerProductos = async () => {
  try {
    const productos = await Producto.findAll();
    return productos;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los productos');
  }
};

const obtenerProductoPorId = async (id) => {
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    return producto;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el producto');
  }
};

const crearProducto = async (productoData) => {
  try {
    const producto = await Producto.create(productoData);
    return producto;
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el producto');
  }
};

const actualizarProducto = async (id, productoData) => {
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    await producto.update(productoData);
    return producto;
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el producto');
  }
};

const eliminarProducto = async (id) => {
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    await producto.destroy();
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el producto');
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
