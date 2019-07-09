process.env.NODE_ENV = 'test';

const Player = require('../models').Player;

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Players', function(){
  /*beforeEach(function(done){
    Player.destroy({
      where: {},
      truncate: true
    }, function (error) {
      done();
    });
  });*/
  
  describe('/GET api/v1/players', function () {
    it('Deve retornar lista de jogadores', function(done) {
      chai.request(app)
      .get('/api/v1/players')
      .end(function (error, res) {
        expect(res).to.have.status(200);
        //E em seguida retornar em um array todos os livros cadastrados na base de dados:
        expect(res).to.be.a('object');
        //res.body.length.should.be.eql(0);
        done();
      });
    });
  });
});