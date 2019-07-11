'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    price: DataTypes.FLOAT,
    order_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER
  }, {});
  OrderItem.associate = function(models) {
    // associations can be defined here
  };
  return OrderItem;
};