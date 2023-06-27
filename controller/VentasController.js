const { Ventas, Productos } = require('../models');

// Función para obtener todas las ventas
async function obtenerVentas(req, res) {
  try {
    const ventas = await Ventas.findAll();
    res.json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener las ventas' });
  }
}

// Función para obtener una venta por su ID
async function obtenerVentaPorId(req, res) {
  const ventaId = req.params.id;
  try {
    const venta = await Ventas.findByPk(ventaId);
    if (!venta) {
      res.status(404).json({ message: 'No se encontró la venta' });
    } else {
      res.json(venta);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener la venta' });
  }
}

// Función para crear una nueva venta
async function crearVenta(req, res) {
  const { fecha_venta, cantidad_vendida, precio_unitario, id_producto } = req.body;
  try {
    const venta = await Ventas.create({ fecha_venta, cantidad_vendida, precio_unitario, id_producto });

    // Actualizar la cantidad de productos
    const producto = await Productos.findByPk(id_producto);
    if (!producto) {
      res.status(404).json({ message: 'No se encontró el producto' });
      return;
    }

    producto.cantidad_disponible -= cantidad_vendida;
    await producto.save();

    res.status(201).json(venta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al crear la venta' });
  }
}

// Función para actualizar una venta
async function actualizarVenta(req, res) {
  const ventaId = req.params.id;
  const { fecha_venta, cantidad_vendida, precio_unitario, id_producto } = req.body;
  try {
    const venta = await Ventas.findByPk(ventaId);
    if (!venta) {
      res.status(404).json({ message: 'No se encontró la venta' });
      return;
    }

    // Actualizar la cantidad de productos de la venta anterior
    const productoAnterior = await Productos.findByPk(venta.id_producto);
    if (!productoAnterior) {
      res.status(404).json({ message: 'No se encontró el producto de la venta anterior' });
      return;
    }

    productoAnterior.cantidad_disponible += venta.cantidad_vendida;
    await productoAnterior.save();

    // Actualizar la cantidad de productos de la nueva venta
    const productoNuevo = await Productos.findByPk(id_producto);
    if (!productoNuevo) {
      res.status(404).json({ message: 'No se encontró el producto de la nueva venta' });
      return;
    }

    productoNuevo.cantidad_disponible -= cantidad_vendida;
    await productoNuevo.save();

    venta.fecha_venta = fecha_venta;
    venta.cantidad_vendida = cantidad_vendida;
    venta.precio_unitario = precio_unitario;
    venta.id_producto = id_producto;

    await venta.save();

    res.json(venta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al actualizar la venta' });
  }
}

// Función para eliminar una venta
async function eliminarVenta(req, res) {
  const ventaId = req.params.id;
  try {
    const venta = await Ventas.findByPk(ventaId);
    if (!venta) {
      res.status(404).json({ message: 'No se encontró la venta' });
      return;
    }

    // Actualizar la cantidad de productos
    const producto = await Productos.findByPk(venta.id_producto);
    if (!producto) {
      res.status(404).json({ message: 'No se encontró el producto' });
      return;
    }

    producto.cantidad_disponible += venta.cantidad_vendida;
    await producto.save();

    await venta.destroy();

    res.json({ message: 'Venta eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al eliminar la venta' });
  }
}

module.exports = {
  obtenerVentas,
  obtenerVentaPorId,
  crearVenta,
  actualizarVenta,
  eliminarVenta
};
