'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ventas', [
      {
        id_producto: 1,
        fecha_venta: new Date(),
        cantidad_vendida: 20,
        precio_unitario: 7.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_producto: 2,
        fecha_venta: new Date(),
        cantidad_vendida: 10,
        precio_unitario: 12.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Agrega más registros según sea necesario
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ventas', null, {});
  }
};
