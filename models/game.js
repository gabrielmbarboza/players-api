'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    genre: DataTypes.STRING,
    multiplayer: DataTypes.BOOLEAN,
    image_path: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};