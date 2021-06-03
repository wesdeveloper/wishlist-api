import Chance from 'chance';
import database from '../../../src/infra/db/mysql/db';

const chance = new Chance();

const makeClientData = () => {
  const client = {
    name: chance.name(),
    email: chance.email(),
  };

  return client;
};

describe('Update client', () => {
  it('should update a client', async () => {
    const clientData = makeClientData();
    const updatedName = `${clientData.name} Updated`;

    const [clientId] = await database.getConnection()('client').insert(clientData);

    const { body, status } = await global.testRequest
      .patch(`/client/${clientId}`)
      .send({ name: updatedName });

    expect(status).toEqual(200);
    expect(body.id).toEqual(clientId);
    expect(body.name).toEqual(updatedName);
  });

  describe('Not found error', () => {
    it('Should update a client that not exists', async () => {
      const clientData = makeClientData();
      const { status } = await global.testRequest
        .get('/client/0')
        .send({ name: clientData.name });

      expect(status).toBe(404);
    });
  });
});
