/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    username_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    tokenID: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(145),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users'
    });
};
