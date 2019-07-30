'use strict';

const view_name = 'v_players_games';
const query = 'select p.id as playerId, g.id as gameId from Orders o inner join Players p on p.id = o.playerId inner join OrderItems oi on o.id = oi.orderId inner join Games g on g.id = oi.gameId where p.id = o.playerId';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`create view ${view_name} as ${query}`);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`drop view ${view_name}`);
  }
};
