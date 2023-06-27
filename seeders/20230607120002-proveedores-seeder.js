'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Proveedores', [
      {
        id_proveedor: 1,
        nombre_proveedor: 'Proveedor 1',
        direccion: 'Dirección proveedor 1',
        telefono: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_proveedor: 2,
        nombre_proveedor: 'Proveedor 2',
        direccion: 'Dirección proveedor 2',
        telefono: '0987654321',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Otros registros de proveedores
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Proveedores', null, {});
  }
};
