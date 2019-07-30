'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    genre: DataTypes.STRING,
    multiplayer: DataTypes.BOOLEAN,
    imagePath: DataTypes.STRING,
    price: DataTypes.FLOAT,
  }, {});
  Game.associate = function(models) {
    Game.hasMany(models.OrderItem, { foreingKey: 'orderItemId' });
  };
  return Game;
};