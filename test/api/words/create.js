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
          };
          chai.request(app)
               .post('/api/words')
               .set('content-type', 'application/json')
               .send(wordObj)
               .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').be.eql('Word created!');
                    res.body.should.have.property('word').should.be.not.empty;
               });
          /* Check if default language was added */
          chai.request(app)
               .get('/api/words')
               .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').be.eql('Words found!');
                    res.body.should.have.property('words').should.be.not.empty;
                    const { words } = res.body;
                    expect(words).to.have.lengthOf(1);
                    const createdWord = words[0];
                    expect(createdWord)
                         .to.have.property('language')
                         .be.eql('en');
                    expect(createdWord)
                         .to.have.property('word')
                         .be.eql('Aquiver');
                    expect(createdWord)
                         .to.have.property('definition')
                         .be.eql('(adj.) Quivering, trembling');
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
               .send(wordObj)
               .end((err, res) => {
                    res.should.have.status(400);
                    const { body } = res;
                    expect(body.message).to.equal('Wrong format provided!');
                    done();
               });
     });
});
