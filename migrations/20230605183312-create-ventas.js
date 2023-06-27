'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ventas', {
      id_venta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fecha_venta: {
        type: Sequelize.DATE,
        allowNull: false
      },
      cantidad_vendida: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      precio_unitario: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('Ventas');
  }
};
