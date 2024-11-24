module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define('users', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      roleId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'roles',
          key: 'id',
          as: 'role'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW')
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW')
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      tableName: 'users',
      timestamps: true,
      paranoid: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt'
    });
  
    // Define associations
    Users.associate = function(models) {
      Users.belongsTo(models.roles, { 
        foreignKey: 'roleId',
        as: 'role' 
      });
    };
  
    return Users;
  };
  