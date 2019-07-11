process.env.NODE_ENV = 'test';

const { Player } = require('../models');

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

var player1 = {
  name: "Player Test",
  email: "player@bogomips.com.br",
  birthday: "1984-05-31",
  password: "123"
}

chai.use(chaiHttp);

var mochaAsync = (fn) => {
  return done => {
    fn.call().then(done, err => {
      done(err);
    });
  };
};

describe('Players', function(){
  afterEach(() => {
    Player.truncate({});
  });
  
  describe('/GET api/v1/players', function() {
    it('Retorna lista de jogadores', function() {
      chai.request(app)
        .get('/api/v1/players')
        .end(function (error, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.a('object');
          expect(res.body.length).to.be.equal(0);
        });
    });
  });

  describe('/POST api/v1/players', function () {
    describe('Cria um jogador', function () {
      it('Retorna status 201 response', function () {
        return chai.request(app)
          .post('/api/v1/players')
          .send(player1)
          .then(function(res) {
            expect(res).to.have.status(201);
          });
      });
    });
  });

  describe('/GET api/v1/players/:id', function () {
    it('Retorna um jogador', function () {
      var player2 = new Player(player1);

      player2.save(function(error, player3) {
        chai.request(app)
          .get('/api/v1/players/' + player3.id)
          .end(function (error, res) {
            expect(res).to.be.a('object');
            expect(res).have.property('name');
            expect(res).have.property('email');
            expect(res).have.property('birthday');
            expect(res).have.property('password');
        });
      });
    });
  });

  describe('/PUT api/v1/players/:id', function () {
    it('Atualiza um jogador', function () {
      var player2 = new Player(player1);

      player2.save(function (error, player3) {
        chai.request(app)
          .put('/api/v1/players/' + player3.id)
          .send({name: "Player Updated"})
          .end(function (error, res) {
            expect(res).to.be.a('object');
            expect(res).to.have.name.equal('Player Updated');
          });
      });
    });
  });

  describe('/DELETE api/v1/players/:id', function () {
    it('Remove um jogador', function () {
      var player2 = new Player(player1);

      player2.save(function (error, player3) {
        chai.request(app)
          .delete('/api/v1/players/' + player3.id)
          .end(function (error, res) {
            expect(response).to.have.status(200);
            //done();
          });
      });
    });
  });
});