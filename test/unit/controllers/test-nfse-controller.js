const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const nfseController = require(
  '../../../server/controllers/nfse-controller',
);
const res = require('express/lib/response');

const expect = chai.expect;
const sandbox = sinon.createSandbox();
chai.use(sinonChai);

// example unit test of health controller
describe('Test nfse controller', () => {
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

    nfseController.getNFEe(mockReq, res);
    expect(res.statusCode).to.equal(204);
  });
});