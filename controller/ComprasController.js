const Compras = require('../models').Compras;
const Productos = require('../models').Productos;
const Proveedores = require('../models').Proveedores;

exports.obtenerCompras = async (req, res) => {
  try {
    const compras = await Compras.findAll({
      include: [Productos, Proveedores]
    });
    res.json(compras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener las compras' });
  }
};

exports.obtenerCompraPorId = async (req, res) => {
  const compraId = req.params.id;
  try {
    const compra = await Compras.findByPk(compraId, {
      include: [Productos, Proveedores]
    });
    if (!compra) {
      res.status(404).json({ message: 'No se encontró la compra' });
    } else {
      res.json(compra);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener la compra' });
  }
};

exports.crearCompra = async (req, res) => {
  const { fecha_compra, cantidad_comprada, precio_unitario, id_producto, id_proveedor } = req.body;
  try {
    const producto = await Productos.findByPk(id_producto);
    if (!producto) {
      res.status(404).json({ message: 'No se encontró el producto' });
      return;
    }

    const proveedor = await Proveedores.findByPk(id_proveedor);
    if (!proveedor) {
      res.status(404).json({ message: 'No se encontró el proveedor' });
      return;
    }

    if (producto.cantidad_disponible === 0) {
      res.status(400).json({ message: 'No hay suficiente cantidad disponible en almacenamiento' });
      return;
    }

    producto.cantidad_disponible -= cantidad_comprada;
    if (producto.cantidad_disponible < 0) {
      producto.cantidad_disponible = 0;
    }
    await producto.save();

    const compra = await Compras.create({ fecha_compra, cantidad_comprada, precio_unitario, id_producto, id_proveedor });

    res.status(201).json(compra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al crear la compra' });
  }
};

exports.actualizarCompra = async (req, res) => {
  const compraId = req.params.id;
  const { fecha_compra, cantidad_comprada, precio_unitario, id_producto, id_proveedor } = req.body;
  try {
    const compra = await Compras.findByPk(compraId);
    if (!compra) {
      res.status(404).json({ message: 'No se encontró la compra' });
      return;
    }

    const productoAnterior = await Productos.findByPk(compra.id_producto);
    if (!productoAnterior) {
      res.status(404).json({ message: 'No se encontró el producto de la compra anterior' });
      return;
    }

    const proveedorAnterior = await Proveedores.findByPk(compra.id_proveedor);
    if (!proveedorAnterior) {
      res.status(404).json({ message: 'No se encontró el proveedor de la compra anterior' });
      return;
    }

    productoAnterior.cantidad_disponible += compra.cantidad_comprada;
    await productoAnterior.save();

    const productoNuevo = await Productos.findByPk(id_producto);
    if (!productoNuevo) {
      res.status(404).json({ message: 'No se encontró el producto de la nueva compra' });
      return;
    }

    const proveedorNuevo = await Proveedores.findByPk(id_proveedor);
    if (!proveedorNuevo) {
      res.status(404).json({ message: 'No se encontró el proveedor de la nueva compra' });
      return;
    }

    if (productoNuevo.cantidad_disponible === 0) {
      res.status(400).json({ message: 'No hay suficiente cantidad disponible en almacenamiento' });
      return;
    }

    productoNuevo.cantidad_disponible -= cantidad_comprada;
    if (productoNuevo.cantidad_disponible < 0) {
      productoNuevo.cantidad_disponible = 0;
    }
    await productoNuevo.save();

    compra.fecha_compra = fecha_compra;
    compra.cantidad_comprada = cantidad_comprada;
    compra.precio_unitario = precio_unitario;
    compra.id_producto = id_producto;
    compra.id_proveedor = id_proveedor;

    await compra.save();

    res.json(compra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al actualizar la compra' });
  }
};

exports.eliminarCompra = async (req, res) => {
  const compraId = req.params.id;
  try {
    const compra = await Compras.findByPk(compraId);
    if (!compra) {
      res.status(404).json({ message: 'No se encontró la compra' });
      return;
    }

    const producto = await Productos.findByPk(compra.id_producto);
    if (!producto) {
      res.status(404).json({ message: 'No se encontró el producto asociado a la compra' });
      return;
    }

    const proveedor = await Proveedores.findByPk(compra.id_proveedor);
    if (!proveedor) {
      res.status(404).json({ message: 'No se encontró el proveedor asociado a la compra' });
      return;
    }

    producto.cantidad_disponible += compra.cantidad_comprada;
    await producto.save();

    await compra.destroy();

    res.json({ message: 'Compra eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al eliminar la compra' });
  }
};
