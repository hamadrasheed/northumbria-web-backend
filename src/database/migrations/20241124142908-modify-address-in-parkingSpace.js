'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('parkingSpaces', 'title', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('parkingSpaces', 'address', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('parkingSpaces', 'city', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('parkingSpaces', 'address');
    await queryInterface.removeColumn('parkingSpaces', 'city');
    await queryInterface.removeColumn('parkingSpaces', 'title');

  }
};
