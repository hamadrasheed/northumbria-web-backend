module.exports = function (sequelize, DataTypes) {
    const ParkingSpace = sequelize.define(
      'parkingSpaces',
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        ownerId: {
          type: DataTypes.BIGINT,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
            as: 'owner',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        availableType: {
            type: DataTypes.ENUM('hourly', 'daily'),
        },
        title: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        postCode: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        pictureUrl: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        rate: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        isAvailable: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
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
        tableName: 'parkingSpaces',
        timestamps: true,
        paranoid: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt',
      }
    );
  
    // Define associations
    ParkingSpace.associate = function (models) {
      // Belongs to a user (owner)
      ParkingSpace.belongsTo(models.users, {
        foreignKey: 'ownerId',
        as: 'owner',
      });
  
      ParkingSpace.hasMany(models.parkingSpaceAvailableDays, {
        foreignKey: 'parkingSpacesId',
        as: 'availableDays',
      })

    };
  
    return ParkingSpace;
  };
  