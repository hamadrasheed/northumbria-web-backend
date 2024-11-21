'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('roles', [
      { name: 'Admin', slug: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Owner', slug: 'owner', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Driver', slug: 'driver', createdAt: new Date(), updatedAt: new Date() }
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }

};
