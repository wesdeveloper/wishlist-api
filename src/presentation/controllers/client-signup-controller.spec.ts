import Chance from 'chance';
import { HelperValidatorErrorItem } from '../../utils/validator';
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

  describe('validations', () => {
    const clientData = makeClientData();
    const clientKeysValidation = ['name', 'email'];

    const sut = makeSut();
    clientKeysValidation.forEach((clientKey) => {
      const clientWithoutKey: any = { ...clientData };
      delete clientWithoutKey[clientKey];

      it(`Should create a client without ${clientKey} and receive bad request error`, async () => {
        const httpRequest: HttpRequest = {
          body: clientWithoutKey,
        };
        const httpResponse: HttpResponse = await sut.clientSignUpController.handle(httpRequest);

        expect(httpResponse.status).toBe(400);

        const errorItem: HelperValidatorErrorItem = httpResponse.data?.errors?.find((error: HelperValidatorErrorItem) => error.path === clientKey);
        expect(errorItem).not.toBeNull();
      });
    });
  });
});
