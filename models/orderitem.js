'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    price: DataTypes.FLOAT,
    orderId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
  }, {
    hooks: {
      beforeCreate: (item, options) => {
        console.log(JSON.stringify(item))
      }
    }
  });
  OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.Order);
    OrderItem.belongsTo(models.Game);
  };
  return OrderItem;
};