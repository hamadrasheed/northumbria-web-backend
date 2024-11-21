'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const availableDaysData = [
      { dayId: 0, name: 'Sunday', slug: 'sunday', createdAt: new Date(), updatedAt: new Date() },
      { dayId: 1, name: 'Monday', slug: 'monday', createdAt: new Date(), updatedAt: new Date() },
      { dayId: 2, name: 'Tuesday', slug: 'tuesday', createdAt: new Date(), updatedAt: new Date() },
      { dayId: 3, name: 'Wednesday', slug: 'wednesday', createdAt: new Date(), updatedAt: new Date() },
      { dayId: 4, name: 'Thursday', slug: 'thursday', createdAt: new Date(), updatedAt: new Date() },
      { dayId: 5, name: 'Friday', slug: 'friday', createdAt: new Date(), updatedAt: new Date() },
      { dayId: 6, name: 'Saturday', slug: 'saturday', createdAt: new Date(), updatedAt: new Date() }
    ];

    await queryInterface.bulkInsert('availableDays', availableDaysData);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('availableDays', null, {});
  }
};
