const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const billController = require(
  '../../../server/controllers/bill-controller',
);
const res = require('express/lib/response');

const expect = chai.expect;
const sandbox = sinon.createSandbox();
chai.use(sinonChai);

// example unit test of health controller
describe('Test bill controller', () => {
  before(() => {
    sandbox.stub(res, 'json');
  });

  afterEach(() => {
    sandbox.reset();
  });

  after(() => {
    sandbox.restore();
  });

  it('should return status 204', () => {
    const mockReq = {};

    billController.newBill(mockReq, res);
    expect(res.statusCode).to.equal(204);
  });
});