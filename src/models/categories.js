/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categories', {
    category_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    category_name: {
      type: DataTypes.STRING(45),
      allowNull: false
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
    tableName: 'categories'
    });
};
