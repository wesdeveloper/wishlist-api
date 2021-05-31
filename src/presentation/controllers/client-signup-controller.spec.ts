import Chance from 'chance';
import { HttpRequest, HttpResponse } from '../protocols';
import { ClientSignUpController } from './client-signup-controller';

const chance = new Chance();

const makeSut = () => {
  const clientSignUpController = new ClientSignUpController();

  return {
    clientSignUpController,
  };
};

const makeClientData = () => {
  const client = {
    name: chance.name(),
    email: chance.email(),
  };

  return client;
};

describe('ClientSignUp Controller', () => {
  describe('Success cases', () => {
    it('Should create a client', async () => {
      const clientData = makeClientData();

      const sut = makeSut();

      const httpRequest: HttpRequest = {
        body: clientData,
      };
      const httpResponse: HttpResponse = await sut.clientSignUpController.handle(httpRequest);
      expect(httpResponse.status).toBe(201);
      expect(httpResponse.data).toEqual(expect.objectContaining({ ...clientData, id: expect.any(Number) }));
    });
  });
});
