const Compras = require('../models').Compras;

exports.obtenerCompras = async () => {
  try {
    const compras = await Compras.findAll();
    return compras;
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al obtener las compras');
  }
};

exports.obtenerCompraPorId = async (compraId) => {
  try {
    const compra = await Compras.findByPk(compraId);
    if (!compra) {
      throw new Error('No se encontró la compra');
    }
    return compra;
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al obtener la compra');
  }
};

exports.crearCompra = async (datosCompra) => {
  const { fecha_compra, cantidad_comprada, precio_unitario, id_producto, id_proveedor } = datosCompra;
  try {
    const compra = await Compras.create({ fecha_compra, cantidad_comprada, precio_unitario, id_producto, id_proveedor });
    return compra;
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al crear la compra');
  }
};

exports.actualizarCompra = async (compraId, datosCompra) => {
  const { fecha_compra, cantidad_comprada, precio_unitario, id_producto, id_proveedor } = datosCompra;
  try {
    const compra = await Compras.findByPk(compraId);
    if (!compra) {
      throw new Error('No se encontró la compra');
    }

    compra.fecha_compra = fecha_compra;
    compra.cantidad_comprada = cantidad_comprada;
    compra.precio_unitario = precio_unitario;
    compra.id_producto = id_producto;
    compra.id_proveedor = id_proveedor;

    await compra.save();

    return compra;
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al actualizar la compra');
  }
};

exports.eliminarCompra = async (compraId) => {
  try {
    const compra = await Compras.findByPk(compraId);
    if (!compra) {
      throw new Error('No se encontró la compra');
    }

    await compra.destroy();

    return 'Compra eliminada correctamente';
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al eliminar la compra');
  }
};
