import Chance from 'chance';

const chance = new Chance();

const clientData = {
  name: chance.name(),
  email: chance.email(),
};

describe('Create client', () => {
  it('should create one client and return it', async () => {
    const { body, status } = await global.testRequest
      .post('/client')
      .send(clientData);

    expect(status).toEqual(201);
    expect(body).toEqual(expect.objectContaining({
      ...clientData,
      id: expect.any(Number),
    }));
  });

  describe('Error cases', () => {
    it('Should update a client with email that already exists', async () => {
      const { status } = await global.testRequest
        .post('/client')
        .send(clientData);

      expect(status).toBe(400);
    });
  });
});
