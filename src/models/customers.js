/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customers', {
    customer_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    mobile_number: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    home_other_number: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(245),
      allowNull: false
    },
    current_guarantees: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    note: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'customers'
    });
};
