process.env.NODE_ENV = 'test';

const { Order } = require('../models');
const { Player } = require('../models');

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

var order1 = {
  player_ip: "127.0.0.1",
  status: "OPENED",
  player_id: 1
}

chai.use(chaiHttp);

var mochaAsync = (fn) => {
  return done => {
    fn.call().then(done, err => {
      done(err);
    });
  };
};

describe('Orders', function(){
  afterEach(() => {
    Order.truncate({});
  });
  
  describe('/GET api/v1/orders', function() {
    it('Retorna lista de pedidos', function() {
      chai.request(app)
        .get('/api/v1/orders')
        .end(function (error, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.a('object');
          expect(res.body.length).to.be.equal(0);
        });
    });
  });

  describe('/POST api/v1/orders', function () {
    describe('Cria um pedido', function () {
      it('Retorna status 201 response', function () {
        return chai.request(app)
          .post('/api/v1/orders')
          .send(order1)
          .then(function(res) {
            expect(res).to.have.status(201);
          });
      });
    });
  });

  describe('/GET api/v1/orders/:id', function () {
    it('Retorna um pedido', function () {
      var order2 = new Order(order1);

      order2.save(function(error, order3) {
        chai.request(app)
          .get('/api/v1/orders/' + order3.id)
          .end(function (error, res) {
            expect(res).to.be.a('object');
            expect(res).have.property('name');
            expect(res).have.property('description');
            expect(res).have.property('genre');
            expect(res).have.property('multiplayer');
            expect(res).have.property('price');
        });
      });
    });
  });

  describe('/PUT api/v1/orders/:id', function () {
    it('Atualiza um pedido', function () {
      var order2 = new Order(order1);

      order2.save(function (error, order3) {
        chai.request(app)
          .put('/api/v1/orders/' + order3.id)
          .send({name: "Order Updated"})
          .end(function (error, res) {
            expect(res).to.be.a('object');
            expect(res).to.have.name.equal('Order Updated');
          });
      });
    });
  });

  describe('/DELETE api/v1/orders/:id', function () {
    it('Remove um pedido', function () {
      var order2 = new Order(order1);

      order2.save(function (error, order3) {
        chai.request(app)
          .delete('/api/v1/orders/' + order3.id)
          .end(function (error, res) {
            expect(response).to.have.status(200);
          });
      });
    });
  });
});