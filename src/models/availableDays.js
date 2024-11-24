module.exports = function (sequelize, DataTypes) {
  const AvailableDay = sequelize.define(
    'availableDays',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      dayId: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: 'availableDays',
      timestamps: true,
      paranoid: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
    }
  );

  AvailableDay.associate = function (models) {
    // Association to ParkingSpaceAvailableDays
    AvailableDay.belongsToMany(models.parkingSpaces, {
      through: models.parkingSpaceAvailableDays,
      foreignKey: 'availableDayId',
      otherKey: 'parkingSpacesId',
      as: 'parkingSpaces',
    });
  };

  return AvailableDay;
};
