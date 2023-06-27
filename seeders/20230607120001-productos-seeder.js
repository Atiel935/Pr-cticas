'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Productos', [
      {
        id_producto: 1,
        nombre_producto: 'Gel Antibacterial 100ml',
        descripcion: 'Gel antibacterial en presentación de 100ml',
        precio: 5.99,
        cantidad_disponible: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_producto: 2,
        nombre_producto: 'Gel Antibacterial 250ml',
        descripcion: 'Gel antibacterial en presentación de 250ml',
        precio: 9.99,
        cantidad_disponible: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Otros registros de productos
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Productos', null, {});
  }
};
