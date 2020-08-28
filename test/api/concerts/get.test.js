const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConOne = new Concert({ performer: 'xyz', genre: 'Rock', price: 25, day: 1, image: 'test.jpg', tickets: 50, freeTickets: 50 });
    await testConOne.save();
  });

  after(async () => {
    await Concert.deleteMany({ performer: 'xyz'});
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get('/api/concerts/5f481ab98b2f4eebd947f024');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
  });


});