/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'products',
        key: 'product_id'
      },
      unique: "fk_orders_productId"
    },
    customer_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'customers',
        key: 'customer_id'
      },
      unique: "fk_orders_customerId"
    },
    guarantor_one_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'customers',
        key: 'customer_id'
      },
      unique: "fk_orders_guarantorOneId"
    },
    guarantor_two_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'customers',
        key: 'customer_id'
      },
      unique: "fk_orders_guarantorTwoId"
    },
    guarantor_three_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'customers',
        key: 'customer_id'
      },
      unique: "fk_orders_guarantorThreeId"
    },
    total_installments: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount_item: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    downpayment: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    date_time_stamp: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    username_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'users',
        key: 'username_id'
      },
      unique: "fk_orders_usernameId"
    },
    date_of_entry: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    order_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'orders',
    hasTrigger: true
    });
};
