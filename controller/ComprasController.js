const { Compras, Productos, Proveedores } = require('../models');

exports.modificarCompra = async (req, res) => {
  const { id } = req.params;
  const { id_producto, id_proveedor, cantidad_comprada } = req.body;

  try {
    // Verificar si la compra existe
    const compra = await Compras.findByPk(id);

    if (!compra) {
      return res.status(404).json({ error: 'La compra no existe' });
    }

    // Buscar el producto en la tabla de Productos
    const producto = await Productos.findByPk(id_producto);

    if (!producto) {
      return res.status(404).json({ error: 'El producto no existe' });
    }

    // Buscar el proveedor en la tabla de Proveedores
    const proveedor = await Proveedores.findByPk(id_proveedor);

    if (!proveedor) {
      return res.status(404).json({ error: 'El proveedor no existe' });
    }

    // Obtener el precio unitario del producto
    const precio_unitario = producto.precio;

    // Actualizar la cantidad del producto
    const cantidadAnterior = compra.cantidad_comprada;
    producto.cantidad_disponible += cantidad_comprada - cantidadAnterior;
    await producto.save();

    // Actualizar la compra en la tabla de Compras
    await compra.update({
      id_producto,
      id_proveedor,
      cantidad_comprada,
      precio_unitario
    });

    res.json(compra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al modificar la compra' });
  }
};

exports.eliminarCompra = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si la compra existe
    const compra = await Compras.findByPk(id);

    if (!compra) {
      return res.status(404).json({ error: 'La compra no existe' });
    }

    // Eliminar la compra
    await compra.destroy();

    res.json({ message: 'Compra eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar la compra' });
  }
};
