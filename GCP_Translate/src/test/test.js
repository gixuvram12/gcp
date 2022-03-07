const { getFilms, getQuotes, getActor, addQuote } = require('../api/gcp/gcp-controller');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
chai.should();
chai.use(chaiHttp);

describe('/GET book', () => {
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

describe('/GET/film_title=titanic quotes', () => {
    it('it should GET all the quotes', (done) => {
      chai.request(server)
      .get('/get_quotes?film_title=titanic')
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
          .get('/get_actor?quote=this is heroine&film_name=titanic')
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
            "actor": "bill",
            "quote": "sample test qoute1" 
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
