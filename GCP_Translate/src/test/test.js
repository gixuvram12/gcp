let chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
chai.should();
chai.use(chaiHttp);

describe('/GET film', () => {
    it('it should GET all the films', (done) => {
      chai.request(server)
          .get('/gcp')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('res_code').eql(1);
            done();
          });
    });
});

describe('/GET/ quotes', () => {
    it('it should GET all the quotes', (done) => {
      chai.request(server)
      .get('/get_quotes?film_title=Scarface')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('res_code').eql(1);
            done();
          })
    });
});

describe('/GET actor', () => {
    it('it should GET the actor', (done) => {
      chai.request(server)
          .get('/get_actor?quote=Say hello to my little friend.&film_name=Scarface')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('res_code').eql(1);
            done();
          })
    });
});

describe('/POST quote', () => {
    it('it should store the quote in firestore', (done) => {
        let quoteActor = {
            "actor": "Tom",
            "quote": "Hey! How are you?" 
         }
      chai.request(server)
          .post('/add_quote')
          .send(quoteActor)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('res_code').eql(1);
            done();
          })
    });
});

describe('/GET message from topic', () => {
    it('it should GET message from topic and store in firestore', (done) => {
      chai.request(server)
          .get('/translate')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('res_code').eql(1);
            done();
          });
    });
});
