/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('receipts', {
    receipt_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
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
      unique: "fk_receipts_orderId"
    },
    installment_payment_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'installments_payments',
        key: 'installments_payment_id'
      },
      unique: "fk_receipts_installmentPaymentId"
    },
    username_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'users',
        key: 'username_id'
      },
      unique: "fk_receipts_usernameId"
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'receipts'
    });
};
