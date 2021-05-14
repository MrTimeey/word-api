process.env.TEST_FLAG = 'test';

const chai = require('chai');

const { expect } = chai;

const should = chai.should();
const chaiHttp = require('chai-http');

const app = require('../../../app');
const conn = require('../../../db/index');

chai.use(chaiHttp);

describe('POST /api/words', () => {
     before(done => {
          conn.connect()
               .then(() => done())
               .catch(err => done(err));
     });

     after(done => {
          conn.close()
               .then(() => done())
               .catch(err => done(err));
     });

     it('Create word', done => {
          let wordObj = {
               word: 'Aquiver',
               definition: '(adj.) Quivering, trembling',
               language: 'en',
          };
          chai.request(app)
               .post('/api/words')
               .set('content-type', 'application/json')
               .set('x-api-key', 'api-key')
               .send(wordObj)
               .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').be.eql('Word created!');
                    res.body.should.have.property('word').should.be.not.empty;
                    done();
               });
     });
     it('Creation failed', done => {
          let wordObj = {
               word: 'Mellifluous',
          };
          chai.request(app)
               .post('/api/words')
               .set('content-type', 'application/json')
               .set('x-api-key', 'api-key')
               .send(wordObj)
               .end((err, res) => {
                    res.should.have.status(400);
                    const { body } = res;
                    expect(body.message).to.equal('Wrong format provided!');
                    done();
               });
     });
});
