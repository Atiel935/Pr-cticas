'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Compras', {
      id_compra: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fecha_compra: {
        type: Sequelize.DATE,
        allowNull: false
      },
      cantidad_comprada: {
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
      id_proveedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Proveedores',
          key: 'id_proveedor'
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
    await queryInterface.dropTable('Compras');
  }
};
