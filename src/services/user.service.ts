import { IUser, UserModel } from "../models/user.model";

export class UserService {
    async createUser(user: IUser): Promise<IUser> {
        const cpfExists = await UserModel.findOne({ cpf: user.cpf }).exec();
        if (cpfExists) {
            throw new Error('CPF already exists');
        }
        const userToCreate = new UserModel(user);
        return userToCreate.save();
    }

    async getUserById(id: string): Promise<IUser | null> {
        return UserModel.findById(id).exec();
    }

    async getUsers(): Promise<IUser[]> {
        return UserModel.find().exec();
    }

    async updateUser(id: string, user: Partial<IUser>): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(id, user, { new: true }).exec();
    }

    async deleteUser(id: string): Promise<IUser | null> {
        return UserModel.findByIdAndDelete(id).exec();
    }
}
