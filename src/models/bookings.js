/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Bookings = sequelize.define(
    'bookings',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      parkingSpaceId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'parkingSpaces',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      statusId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'bookingStatus',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'bookings',
      timestamps: true,
      paranoid: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
    }
  );

  Bookings.associate = function (models) {
    Bookings.belongsTo(models.parkingSpaces, {
      foreignKey: 'parkingSpaceId',
      as: 'parkingSpace',
    });
  };

  return Bookings;
};
