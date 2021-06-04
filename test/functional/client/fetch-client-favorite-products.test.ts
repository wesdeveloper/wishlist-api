import Chance from 'chance';
import nock from 'nock';
import database from '../../../src/infra/db/mysql/db';

const { PRODUCT_API_HOST } = process.env;

const chance = new Chance();

describe('Fetch client favorite products', () => {
  it('should fetch client favorite products', async () => {
    const clientData = {
      name: chance.name(),
      email: chance.email(),
    };
    const productId = chance.guid();
    nock(PRODUCT_API_HOST || '')
      .get(`/api/product/${productId}/`)
      .reply(200, { id: productId });

    const [clientId] = await database.getConnection()('client').insert(clientData);
    await database.getConnection()('favorite_products').insert({ client_id: clientId, product_id: productId });

    const { body, status } = await global.testRequest
      .get(`/client/${clientId}/favorite-products`);

    expect(status).toEqual(200);
    expect(body).toEqual(expect.objectContaining({
      products: expect.any(Array),
      pagination: expect.any(Object),
    }));
  });
});
