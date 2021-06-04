import Chance from 'chance';
import nock from 'nock';
import database from '../../../src/infra/db/mysql/db';

const { PRODUCT_API_HOST } = process.env;

const chance = new Chance();

const makeClient = () => ({
  name: chance.name(),
  email: chance.email(),
});

describe('Add client favorite products client', () => {
  it('should add client favorite products ', async () => {
    const productId = '1bf0f365-fbdd-4e21-9786-da459d78dd1f' || chance.guid();
    nock(PRODUCT_API_HOST || '')
      .get(`/api/product/${productId}/`)
      .reply(200, {});

    const clientData = makeClient();
    const [clientId] = await database.getConnection()('client').insert(clientData);

    const { status } = await global.testRequest.post(`/client/${clientId}/favorite-products/${productId}`);

    expect(status).toEqual(204);
  });
});
