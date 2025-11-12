import { UserService } from '../../src/services/user.service';
import { userMock, UserModelMock, resetUserMocks } from '../mocks/user.mock';

jest.mock('../models/user.model', () => ({
    UserModel: jest.fn(() => UserModelMock)
}));

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        service = new UserService();
        resetUserMocks();
    });

    it('should create a new user if CPF does not exist', async () => {
        UserModelMock.findOne.mockResolvedValue(null);
        UserModelMock.save.mockResolvedValue(userMock);

        const result = await service.createUser(userMock);
        expect(result).toEqual(userMock);
        expect(UserModelMock.findOne).toHaveBeenCalledWith({ cpf: userMock.cpf });
        expect(UserModelMock.save).toHaveBeenCalled();
    });
});
