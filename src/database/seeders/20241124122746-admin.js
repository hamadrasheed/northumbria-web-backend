'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const admin1Password =  await bcrypt.hash('123456', 10);
    const adminUser = [
      {
        firstName: 'Super',
        LastName: 'Admin',
        email: 'admin@bookMySpot.com',
        password: admin1Password,
        roleId: 1,
      }
    ];

    await queryInterface.bulkInsert('users', adminUser);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
