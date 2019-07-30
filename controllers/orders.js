const Order = require('../models').Order;
const OrderItem = require('../models').OrderItem;

module.exports = {
  list (req, res) {
    return Order
      .findAll({
        include: [
          { model: OrderItem }
        ]
      })
      .then((orders) => res.status(200).send(orders))
      .catch((error) => { res.status(400).send(error); });
  },

  getById (req, res) {
    return Order
      .findOne({
        where: {
          id: req.params.id
        },
        include: [
          { model: OrderItem }
        ]
      })
      .then((order) => {
        //console.log(JSON.stringify(order.orderItems));
        if (!order) {
          return res.status(404).send({
            message: 'Order Not Found',
          });
        }
        return res.status(200).send(order);
      })
      .catch((error) => res.status(400).send(error));
  },

  add (req, res) {
    return Order
      .create({
        playerIp: req.header('x-forwarded-for') || req.connection.remoteAddress,
        status: 'OPENED',
        playerId: req.body.playerId,
              OrderItems: req.body.items
      }, {
        include: [{ model: OrderItem }]
      })
      .then((order) => res.status(201).send(order))
      .catch((error) => {
        res.status(400).send(error)
      });
  },

  update (req, res) {
    return Order
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(order => {
        if (!order) {
          return res.status(404).send({
            message: 'Order Not Found',
          });
        }
        return order
          .update({
            status: req.body.status || order.status
          })
          .then(() => res.status(200).send(order))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete (req, res) {
    return Order
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(order => {
        if (!order) {
          return res.status(400).send({
            message: 'Order Not Found',
          });
        }
        return order
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};