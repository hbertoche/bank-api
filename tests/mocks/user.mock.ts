import { IUser, UserModel } from "../../src/models/user.model";

// Mock completo do Mongoose UserModel
export const userMock: IUser = {
    cpf: '12345678900',
    name: 'Hugo',
    email: 'hugo@test.com'
} as IUser;

export const UserModelMock = {
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
};

// Função para resetar mocks entre testes
export const resetUserMocks = () => {
    Object.values(UserModelMock).forEach(fn => fn.mockReset());
};
