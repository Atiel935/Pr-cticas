const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Ventas = sequelize.define('Ventas', {
    id_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fecha_venta: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cantidad_vendida: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_unitario: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {});

  Ventas.associate = function (models) {
    Ventas.belongsTo(models.Productos, {
      foreignKey: 'id_producto',
      onDelete: 'CASCADE'
    });
  };

  return Ventas;
};
