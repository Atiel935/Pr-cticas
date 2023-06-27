'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Almacenamiento', [
      {
        id_producto: 1,
        fecha_entrada: new Date(),
        cantidad_almacenada: 100,
        ubicacion: 'Ubicación 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_producto: 2,
        fecha_entrada: new Date(),
        cantidad_almacenada: 75,
        ubicacion: 'Ubicación 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Agrega más registros según sea necesario
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Almacenamiento', null, {});
  }
};
