const { Sequelize, DataTypes, Model } = require("sequelize");
// const sequelize = require("../database/mysql");

class User extends Model {}
User.init(
  {
    // Model attributes are defined here
    username_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    tokenID: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize: mysequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
    tableName: "users",
  }
);

module.exports = User;
