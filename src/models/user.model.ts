import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
    cpf: string;
    email: string;
    name: string;
}

const userSchema = new Schema<IUser>({
        cpf: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        name: { type: String, required: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } }, 
);

export const UserModel = model<IUser>('User', userSchema);
