import Chance from 'chance';

const chance = new Chance();

describe('Create client', () => {
  it('should create one client and return it', async () => {
    const clientData = {
      name: chance.name(),
      email: chance.email(),
    };

    const { body, status } = await global.testRequest
      .post('/client')
      .send(clientData);

    expect(status).toEqual(201);
    expect(body).toEqual(expect.objectContaining({
      ...clientData,
      id: expect.any(Number),
    }));
  });
});
