const { Productos } = require('../models');

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Productos.findAll();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al obtener los productos' });
  }
};

exports.obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Productos.findByPk(id);
    
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al obtener el producto' });
  }
};


exports.crearProducto = async (req, res) => {
  try {
    const { nombre_producto, descripcion, precio, cantidad_disponible } = req.body;

    if (!nombre_producto || !descripcion || !precio || !cantidad_disponible) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const nuevoProducto = await Productos.create({
      nombre_producto,
      descripcion,
      precio,
      cantidad_disponible
    });

    res.json(nuevoProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al crear el producto' });
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_producto, descripcion, precio, cantidad_disponible } = req.body;
    const producto = await Productos.findByPk(id);
    
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (!nombre_producto || !descripcion || !precio || !cantidad_disponible) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    producto.nombre_producto = nombre_producto;
    producto.descripcion = descripcion;
    producto.precio = precio;
    producto.cantidad_disponible = cantidad_disponible;
    
    await producto.save();

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al actualizar el producto' });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Productos.findByPk(id);
    
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    await producto.destroy();

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al eliminar el producto' });
  }
};
