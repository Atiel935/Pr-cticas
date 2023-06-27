'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Administrador', {
      id_admin: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre_admin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correo_admin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contrasena: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nivel_acceso: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Administrador');
  }
};
