const Compras = require('../models/Compras');
const Productos = require('../models/Productos');
const Proveedores = require('../models/Proveedores');


exports.agregarCompra = async (req, res) => {
  const { id_producto, id_proveedor, cantidad_comprada } = req.body;

  try {
    // Buscar el producto en la tabla de Productos
    const producto = await Productos.findByPk(id_producto);

    if (!producto) {
      return res.status(404).json({ error: 'El producto no existe' });
    }

    // Obtener el precio unitario del producto
    const precio_unitario = producto.precio_unitario;

    // Actualizar la cantidad del producto
    producto.cantidad += cantidad_comprada;
    await producto.save();

    // Crear la compra en la tabla de Compras
    const compra = await Compras.create({
      id_producto,
      id_proveedor,
      cantidad_comprada,
      fecha_compra: new Date(),
      precio_unitario
    });

    res.status(201).json(compra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al agregar la compra' });
  }
};


exports.obtenerCompras = async () => {
  try {
    const compras = await Compras.findAll({
      include: [Productos, Proveedores]
    });
    return compras;
  } catch (error) {
    throw new Error('Error al obtener las compras');
  }
};

/*exports.crearCompra = async (compraData) => {
  try {
    const { id_producto, id_proveedor } = compraData;

    const producto = await Productos.findByPk(id_producto);
    if (!producto) {
      throw new Error('El producto especificado no existe');
    }

    const proveedor = await Proveedores.findByPk(id_proveedor);
    if (!proveedor) {
      throw new Error('El proveedor especificado no existe');
    }

    const compra = await Compras.create(compraData);
    return compra;
  } catch (error) {
    throw new Error('Error al crear la compra');
  }
};*/



exports.actualizarCompra = async (id, compraData) => {
  try {
    const compra = await Compras.findByPk(id);
    if (!compra) {
      throw new Error('La compra especificada no existe');
    }

    const { id_producto, id_proveedor } = compraData;

    if (id_producto) {
      const producto = await Productos.findByPk(id_producto);
      if (!producto) {
        throw new Error('El producto especificado no existe');
      }
    }

    if (id_proveedor) {
      const proveedor = await Proveedores.findByPk(id_proveedor);
      if (!proveedor) {
        throw new Error('El proveedor especificado no existe');
      }
    }

    await Compras.update(compraData, { where: { id } });
    return true;
  } catch (error) {
    throw new Error('Error al actualizar la compra');
  }
};

exports.eliminarCompra = async (id) => {
  try {
    const compra = await Compras.findByPk(id);
    if (!compra) {
      throw new Error('La compra especificada no existe');
    }

    await Compras.destroy({ where: { id } });
    return true;
  } catch (error) {
    throw new Error('Error al eliminar la compra');
  }
};
