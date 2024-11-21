'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.createTable('availableDays', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        dayId: {
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('availableDays');
  }
};
