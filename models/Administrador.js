const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Administrador = sequelize.define('Administrador', {
    id_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_admin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo_admin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nivel_acceso: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  return Administrador;
};
