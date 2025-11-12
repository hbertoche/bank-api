import { Schema, model, Document, Types } from 'mongoose';
import { TransactionType } from '../enums/transactionType.enum';

export interface ITransaction extends Document {
    transactionType: TransactionType;
    amount: number;
    date: Date;
    userId: Types.ObjectId;
    destinationUserId?: Types.ObjectId;
    originalTransactionId?: Types.ObjectId;
}

const transactionSchema = new Schema<ITransaction>({
        transactionType: { type: String, enum: Object.values(TransactionType), required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
        userId: { type: Schema.Types.ObjectId, required: true },
        destinationUserId: { type: Schema.Types.ObjectId, required: false },
        originalTransactionId: { type: Schema.Types.ObjectId, required: false },
    },
    { timestamps: { createdAt: true, updatedAt: false } },
);

export const TransactionModel = model<ITransaction>('Transaction', transactionSchema);
