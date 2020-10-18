/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    product_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'category_id'
      },
      unique: "fk_products_categoryId"
    },
    price: {
      type: DataTypes.DECIMAL,
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
    tableName: 'products'
    });
};
