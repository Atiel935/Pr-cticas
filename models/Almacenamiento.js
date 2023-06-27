const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Almacenamiento = sequelize.define('Almacenamiento', {
    id_almacenamiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fecha_entrada: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cantidad_almacenada: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'almacenamiento' // Especifica el nombre de la tabla
  });

  Almacenamiento.associate = function (models) {
    Almacenamiento.belongsTo(models.Productos, {
      foreignKey: 'id_producto',
      onDelete: 'CASCADE'
    });
  };

  return Almacenamiento;
};
