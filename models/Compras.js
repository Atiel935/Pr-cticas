const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Compras = sequelize.define('Compras', {
    id_compra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fecha_compra: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cantidad_comprada: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_unitario: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {});

  Compras.associate = function (models) {
    Compras.belongsTo(models.Productos, {
      foreignKey: 'id_producto',
      onDelete: 'CASCADE'
    });
    Compras.belongsTo(models.Proveedores, {
      foreignKey: 'id_proveedor',
      onDelete: 'CASCADE'
    });
  };

  return Compras;
};
