module.exports = function (sequelize, DataTypes) {
    const ParkingSpaceAvailableDay = sequelize.define(
      'parkingSpaceAvailableDays',
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        parkingSpacesId: {
          type: DataTypes.BIGINT,
          references: {
            model: 'parkingSpaces',
            key: 'id',
            as: 'parkingSpaces',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        availableDayId: {
          type: DataTypes.BIGINT,
          references: {
            model: 'availableDays',
            key: 'id',
            as: 'availableDay',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      },
      {
        tableName: 'parkingSpaceAvailableDays',
        timestamps: false,
      }
    );

    ParkingSpaceAvailableDay.associate = function (models) {
      // Belongs to a user (owner)
      ParkingSpaceAvailableDay.belongsTo(models.availableDays, {
        foreignKey: 'availableDayId',
        as: 'availableDay',
      });
  
    };
  
    return ParkingSpaceAvailableDay;
  };
  