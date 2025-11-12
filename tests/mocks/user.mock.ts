import { IUser, UserModel } from "../../src/models/user.model";

jest.mock('../../src/models/user.model');

export const userMock: IUser = {
    cpf: '12345678900',
    name: 'Hugo',
    email: 'hugo@test.com'
} as IUser;

const mockSave = jest.fn();
const mockFindOne = jest.fn();
const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockFindByIdAndDelete = jest.fn();

export const setupUserModelMock = () => {
    (UserModel as any).mockImplementation((data: any) => ({
        save: mockSave
    }));
    (UserModel.findOne as jest.Mock) = mockFindOne;
    (UserModel.findById as jest.Mock) = mockFindById;
    (UserModel.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
    (UserModel.findByIdAndDelete as jest.Mock) = mockFindByIdAndDelete;
};

export const UserModelMock = {
    save: mockSave,
    findOne: mockFindOne,
    findById: mockFindById,
    findByIdAndUpdate: mockFindByIdAndUpdate,
    findByIdAndDelete: mockFindByIdAndDelete,
};
