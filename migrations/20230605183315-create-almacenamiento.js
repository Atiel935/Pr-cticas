'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Almacenamiento', {
      id_almacenamiento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fecha_entrada: {
        type: Sequelize.DATE,
        allowNull: false
      },
      cantidad_almacenada: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ubicacion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      id_producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Productos',
          key: 'id_producto'
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Almacenamiento');
  }
};
