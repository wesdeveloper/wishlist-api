import Chance from 'chance';
import database from '../../../src/infra/db/mysql/db';

const chance = new Chance();

describe('Fetch client by id', () => {
  it('should fetch client by id', async () => {
    const clientData = {
      name: chance.name(),
      email: chance.email(),
    };

    const [clientId] = await database.getConnection()('client').insert(clientData);

    const { body, status } = await global.testRequest
      .get(`/client/${clientId}`);

    expect(status).toEqual(200);
    expect(body.id).toEqual(clientId);
  });

  describe('Not found error', () => {
    it('Should fetch a client by id that not exists', async () => {
      const { status } = await global.testRequest
        .get('/client/0');

      expect(status).toBe(404);
    });
  });
});
