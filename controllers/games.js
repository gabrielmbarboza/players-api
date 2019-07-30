
const { Game } = require('../models');

module.exports = {
  list (req, res) {
    return Game
      .findAll()
      .then((games) => res.status(200).send(games))
      .catch((error) => { res.status(400).send(error); });
  },

  getById (req, res) {
    return Game
      .sequelize.query('SELECT g.id, g.name, g.description, g.genre, g.multiplayer, g.imagePath, g.price, MIN(oi.price) as min_price, MAX(oi.price) as max_price, AVG(oi.price) as average_price, SUM(oi.price) as sum_price, COUNT(oi.id) as amount FROM Games g inner join OrderItems oi on g.id = oi.gameId WHERE oi.gameId = ' + req.params.id)
      .then((game) => {
        if (!game) {
          return res.status(404).send({
            message: 'Game Not Found',
          });
        }
        return res.status(200).send(game[0]);
      })
      .catch((error) => res.status(400).send(error));
  },

  add (req, res) {
    return Game
      .create({
        name: req.body.name,
        description: req.body.description,
        genre: req.body.genre,
        multiplayer: req.body.multiplayer,
        image_path: req.body.image_path,
        price: req.body.price
      })
      .then((game) => res.status(201).send(game))
      .catch((error) => res.status(400).send(error));
  },

  update (req, res) {
    return Game
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(game => {
        if (!game) {
          return res.status(404).send({
            message: 'Game Not Found',
          });
        }
        return game
          .update({
            name: req.body.name || game.name,
            description: req.body.description || game.description,
            genre: req.body.genre || game.genre,
            multiplayer: req.body.multiplayer || game.multiplayer,
            image_path: req.body.image_path || game.image_path,
            price: req.body.price || game.price
          })
          .then(() => res.status(200).send(game))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete (req, res) {
    return Game
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(game => {
        if (!game) {
          return res.status(400).send({
            message: 'Game Not Found',
          });
        }
        return game
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};