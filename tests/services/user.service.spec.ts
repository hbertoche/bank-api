import { UserService } from '../../src/services/user.service';
import { userMock, UserModelMock, setupUserModelMock } from '../mocks/user.mock';

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        service = new UserService();
        jest.clearAllMocks();
        setupUserModelMock();
    });

    it('should create a new user if CPF does not exist', async () => {
        UserModelMock.findOne.mockReturnValue({
            exec: jest.fn().mockResolvedValue(null)
        });
        UserModelMock.save.mockResolvedValue(userMock);

        const result = await service.createUser(userMock);
        expect(result).toEqual(userMock);
    });

    it('should throw error if CPF already exists', async () => {
        UserModelMock.findOne.mockReturnValue({
            exec: jest.fn().mockResolvedValue(userMock)
        });

        await expect(service.createUser(userMock)).rejects.toThrow('CPF already exists');
    });

    it('should retrieve user by ID', async () => {
        UserModelMock.findById.mockReturnValue({
            exec: jest.fn().mockResolvedValue(userMock)
        });
        const result = await service.getUserById('someUserId');
        expect(result).toEqual(userMock);
    });

    it('should update user information', async () => {
        const updatedData = { name: 'Updated Name' };
        UserModelMock.findByIdAndUpdate.mockReturnValue({
            exec: jest.fn().mockResolvedValue({ ...userMock, ...updatedData })
        });
        const result = await service.updateUser('someUserId', updatedData);
        expect(result).toEqual({ ...userMock, ...updatedData });
    });

    it('should delete user by ID', async () => {
        UserModelMock.findByIdAndDelete.mockReturnValue({
            exec: jest.fn().mockResolvedValue(userMock)
        });
        const result = await service.deleteUser('someUserId');
        expect(result).toEqual(userMock);
    });
});
