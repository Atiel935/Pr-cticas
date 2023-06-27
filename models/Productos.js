const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Productos = sequelize.define('Productos', {
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_producto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    cantidad_disponible: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  Productos.addHook('beforeCreate', async (producto) => {
    const count = await Productos.count();
    producto.id_producto = count + 1;
  });

  return Productos;
};
