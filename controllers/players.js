
const Player = require('../models').Player;
const Order = require('../models').Order;

module.exports = {
  list (req, res) {
    return Player
      .findAll({
        include:[
          {model: Order}
        ]
      })
      .then((players) => res.status(200).send(players))
      .catch((error) => { res.status(400).send(error); });
  },

  getById (req, res) {
    return Player
      .findOne({
        where: {
          id: req.params.id
        },
        include: [
          { model: Order }
        ]
      })
      .then((player) => {
        if (!player) {
          return res.status(404).send({
            message: 'Player Not Found',
          });
        }
        return res.status(200).send(player);
      })
      .catch((error) => res.status(400).send(error));
  },

  add (req, res) {
    return Player
      .create({
        name: req.body.name,
        email: req.body.email,
        birthday: req.body.birthday,
        password: req.body.password
      })
      .then((player) => res.status(201).send(player))
      .catch((error) => res.status(400).send(error));
  },

  update (req, res) {
    return Player
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(player => {
        if (!player) {
          return res.status(404).send({
            message: 'Player Not Found',
          });
        }
        return player
          .update({
            name: req.body.name || player.name,
            email: req.body.email || player.email,
            birthday: req.body.birthday || player.birthday,
            password: req.body.password || player.password
          })
          .then(() => res.status(200).send(player))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete (req, res) {
    return Player
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(player => {
        if (!player) {
          return res.status(400).send({
            message: 'Player Not Found',
          });
        }
        return player
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  orders (req, res) {
    return Order
      .findAll({
        where: {
          playerId: req.params.id
        }
      })
      .then((orders) => res.status(200).send(orders))
      .catch((error) => { res.status(400).send(error); 
      });
  }
};