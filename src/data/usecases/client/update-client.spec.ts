import Chance from 'chance';
import { ClientModel } from '../../../domain/models';
import { UpdateClientData } from '../../../domain/usecases';
import { UpdateClientRepository } from '../../protocols';
import { UpdateClientUseCase } from './update-client';

const chance = new Chance();

const makeUpdateClientRepository = () => {
  class UpdateClientUseRepoStub implements UpdateClientRepository {
    update = async (clientId: number, data: UpdateClientData): Promise<ClientModel | undefined> => ({
      id: clientId,
      email: chance.email(),
      name: chance.name(),
      ...data,
    });
  }
  return new UpdateClientUseRepoStub();
};

const makeSut = () => {
  const updateClientRepoStub = makeUpdateClientRepository();
  const sut = new UpdateClientUseCase(updateClientRepoStub);

  return {
    sut,
  };
};

describe('Update Client usecase', () => {
  it('Should update a client', async () => {
    const clientId = chance.integer();
    const clientData = {
      name: chance.name(),
    };

    const { sut } = makeSut();
    const client = await sut.update(clientId, clientData);

    expect(client).toEqual(expect.objectContaining({ id: clientId, ...clientData }));
  });
});
