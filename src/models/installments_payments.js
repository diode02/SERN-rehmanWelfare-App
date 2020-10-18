/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('installments_payments', {
    installments_payment_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'order_id'
      },
      unique: "fk_installmentsPayments_orderId"
    },
    installment_no: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    previous_outstanding: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    amount_to_receive: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    penality: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    amount_received: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    username_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'users',
        key: 'username_id'
      },
      unique: "fk_installmentsPayments_usernameId"
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'installments_payments',
    hasTrigger: true
    });
};
