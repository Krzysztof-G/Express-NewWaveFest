const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConOne = new Concert({ performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: 'test.jpg', tickets: 50 });
    await testConOne.save();

    const testConTwo = new Concert({ performer: 'Rebekah Parker', genre: 'R&B', price: 25, day: 1, image: 'test.jpg', tickets: 50 });
    await testConTwo.save();
  });

  after(async () => {
    await Concert.deleteMany({ performer: 'John Doe' });
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });


});