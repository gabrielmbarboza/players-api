process.env.NODE_ENV = 'test';

const { Game } = require('../models');

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

var game1 = {
  name: "Game Test",
  description: "Game description",
  genre: "RPG",
  multiplayer: true,
  image_path: "imagename.jpg",
  price: "99.99"
}

chai.use(chaiHttp);

var mochaAsync = (fn) => {
  return done => {
    fn.call().then(done, err => {
      done(err);
    });
  };
};

describe('Games', function(){
  afterEach(() => {
    Game.truncate({});
  });
  
  describe('/GET api/v1/games', function() {
    it('Retorna lista de jogos', function() {
      chai.request(app)
        .get('/api/v1/games')
        .end(function (error, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.a('object');
          expect(res.body.length).to.be.equal(0);
        });
    });
  });

  describe('/POST api/v1/games', function () {
    describe('Cria um jogo', function () {
      it('Retorna status 201 response', function () {
        return chai.request(app)
          .post('/api/v1/games')
          .send(game1)
          .then(function(res) {
            expect(res).to.have.status(201);
          });
      });
    });
  });

  describe('/GET api/v1/games/:id', function () {
    it('Retorna um jogo', function () {
      var game2 = new Game(game1);

      game2.save(function(error, game3) {
        chai.request(app)
          .get('/api/v1/games/' + game3.id)
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

  describe('/PUT api/v1/games/:id', function () {
    it('Atualiza um jogo', function () {
      var game2 = new Game(game1);

      game2.save(function (error, game3) {
        chai.request(app)
          .put('/api/v1/games/' + game3.id)
          .send({name: "Game Updated"})
          .end(function (error, res) {
            expect(res).to.be.a('object');
            expect(res).to.have.name.equal('Game Updated');
          });
      });
    });
  });

  describe('/DELETE api/v1/games/:id', function () {
    it('Remove um jogo', function () {
      var game2 = new Game(game1);

      game2.save(function (error, game3) {
        chai.request(app)
          .delete('/api/v1/games/' + game3.id)
          .end(function (error, res) {
            expect(response).to.have.status(200);
          });
      });
    });
  });
});