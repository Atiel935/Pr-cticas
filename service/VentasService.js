const { Ventas, Productos } = require('../models');

exports.obtenerVentas = async () => {
  try {
    const ventas = await Ventas.findAll();
    return ventas;
  } catch (error) {
    throw new Error('Hubo un error al obtener las ventas');
  }
};

exports.obtenerVentaPorId = async (ventaId) => {
  try {
    const venta = await Ventas.findByPk(ventaId);
    if (!venta) {
      throw new Error('No se encontró la venta');
    }
    return venta;
  } catch (error) {
    throw new Error('Hubo un error al obtener la venta');
  }
};

exports.crearVenta = async (ventaData) => {
  try {
    const { fecha_venta, cantidad_vendida, precio_unitario, id_producto } = ventaData;

    const venta = await Ventas.create({
      fecha_venta,
      cantidad_vendida,
      precio_unitario,
      id_producto
    });

    const producto = await Productos.findByPk(id_producto);
    if (!producto) {
      throw new Error('No se encontró el producto');
    }

    producto.cantidad_disponible -= cantidad_vendida;
    await producto.save();

    return venta;
  } catch (error) {
    throw new Error('Hubo un error al crear la venta');
  }
};

exports.actualizarVenta = async (ventaId, ventaData) => {
  try {
    const { fecha_venta, cantidad_vendida, precio_unitario, id_producto } = ventaData;

    const venta = await Ventas.findByPk(ventaId);
    if (!venta) {
      throw new Error('No se encontró la venta');
    }

    const productoAnterior = await Productos.findByPk(venta.id_producto);
    if (!productoAnterior) {
      throw new Error('No se encontró el producto de la venta anterior');
    }

    productoAnterior.cantidad_disponible += venta.cantidad_vendida;
    await productoAnterior.save();

    const productoNuevo = await Productos.findByPk(id_producto);
    if (!productoNuevo) {
      throw new Error('No se encontró el producto de la nueva venta');
    }

    productoNuevo.cantidad_disponible -= cantidad_vendida;
    await productoNuevo.save();

    venta.fecha_venta = fecha_venta;
    venta.cantidad_vendida = cantidad_vendida;
    venta.precio_unitario = precio_unitario;
    venta.id_producto = id_producto;

    await venta.save();

    return venta;
  } catch (error) {
    throw new Error('Hubo un error al actualizar la venta');
  }
};

exports.eliminarVenta = async (ventaId) => {
  try {
    const venta = await Ventas.findByPk(ventaId);
    if (!venta) {
      throw new Error('No se encontró la venta');
    }

    const producto = await Productos.findByPk(venta.id_producto);
    if (!producto) {
      throw new Error('No se encontró el producto');
    }

    producto.cantidad_disponible += venta.cantidad_vendida;
    await producto.save();

    await venta.destroy();
  } catch (error) {
    throw new Error('Hubo un error al eliminar la venta');
  }
};
