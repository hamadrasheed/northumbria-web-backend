'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('parkingSpaces', 'hourlyRate');
    await queryInterface.removeColumn('parkingSpaces', 'dailyRate');

    await queryInterface.addColumn('parkingSpaces', 'availableType', {
      type: Sequelize.ENUM('hourly', 'daily'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Add hourlyRate and dailyRate columns back
    await queryInterface.addColumn('parkingSpaces', 'hourlyRate', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });
    await queryInterface.addColumn('parkingSpaces', 'dailyRate', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });

    await queryInterface.removeColumn('parkingSpaces', 'availableType');
  },
};
