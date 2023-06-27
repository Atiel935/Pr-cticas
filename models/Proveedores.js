const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Proveedores = sequelize.define('Proveedores', {
    id_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_proveedor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  return Proveedores;
};
