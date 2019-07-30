'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.DATE,
    password: DataTypes.STRING
  }, {});
  Player.associate = function(models) {
   Player.hasMany(models.Order);
  };
  Player.hasGames = function(id, items) {
    var gameIds = [];
    console.log(JSON.stringify(items))
    /*for(var i = 0; i < items[0].length; i++) {
    
    }*/
    return "O metodo existe <<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
   /* Player
      .sequelize
      .query("select ")*/
  }
  return Player;
};