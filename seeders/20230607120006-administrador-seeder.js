'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Administrador', [
      {
        nombre_admin: 'Administrador 1',
        correo_admin: 'admin1@example.com',
        contrasena: 'contrasena123',
        nivel_acceso: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre_admin: 'Administrador 2',
        correo_admin: 'admin2@example.com',
        contrasena: 'contrasena456',
        nivel_acceso: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Agrega más datos de administradores si es necesario
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Administrador', null, {});
  }
};
