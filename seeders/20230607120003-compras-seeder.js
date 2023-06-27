'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Compras', [
      {
        id_producto: 1,
        id_proveedor: 1,
        fecha_compra: new Date(),
        cantidad_comprada: 50,
        precio_unitario: 5.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_producto: 2,
        id_proveedor: 2,
        fecha_compra: new Date(),
        cantidad_comprada: 30,
        precio_unitario: 9.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Agrega más registros según sea necesario
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Compras', null, {});
  }
};
