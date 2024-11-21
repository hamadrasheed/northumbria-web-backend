'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const bookingStatusData = [
      { name: 'Reserved', slug: 'reserved', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Completed', slug: 'completed', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cancelled', slug: 'cancelled', createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('bookingStatus', bookingStatusData);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('bookingStatus', null, {});
  }
};
