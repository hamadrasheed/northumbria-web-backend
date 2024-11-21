'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('parkingSpaceAvailableDays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      parkingSpacesId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'parkingSpaces',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      availableDayId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'availableDays',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('parkingSpaceAvailableDays');
  }
};
