import Chance from 'chance';
import { RemoveClientRepository } from '../../protocols';
import { RemoveClientUseCase } from './remove-client';

const chance = new Chance();

const makeRemoveClientRepository = () => {
  class RemoveClientUseRepoStub implements RemoveClientRepository {
    // eslint-disable-next-line
    remove = async (clientId: number): Promise<boolean> => true;
  }
  return new RemoveClientUseRepoStub();
};

const makeSut = () => {
  const removeClientRepoStub = makeRemoveClientRepository();
  const sut = new RemoveClientUseCase(removeClientRepoStub);

  return {
    sut,
  };
};

describe('Remove Client usecase', () => {
  it('Should remove a client', async () => {
    const clientId = chance.integer();

    const { sut } = makeSut();
    const isRemoved = await sut.remove(clientId);

    expect(isRemoved).toBeTruthy();
  });
});
