'use strict';

const OPENED = 'OPENED';
const PENDING = 'PENDING';
const CLOSED = 'CLOSED';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    playerIp: DataTypes.STRING,
    status: DataTypes.ENUM(OPENED, PENDING, CLOSED),
    playerId: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.Player);
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
  };
  return Order;
};