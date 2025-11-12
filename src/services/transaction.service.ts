import { TransactionType } from "../enums/transactionType.enum";
import { ITransaction, TransactionModel } from "../models/transaction.model";

export class TransactionService {
    private calculateBalance(transactions: ITransaction[], receivedTransfers: ITransaction[]): number {
        let balance = receivedTransfers.reduce((acc, transaction) => acc + transaction.amount, 0);
        balance += transactions.reduce((acc, transaction) => {
            if (transaction.transactionType === TransactionType.DEPOSIT) {
                return acc + transaction.amount;
            } else {
                return acc - transaction.amount;
            }
        }, 0);
        return balance;
    }

    async createTransaction(transaction: ITransaction): Promise<ITransaction> {
        const transactionToCreate = new TransactionModel(transaction);
        return transactionToCreate.save();
    }

    async getTransactionById(id: string): Promise<ITransaction | null> {
        return TransactionModel.findById(id).exec();
    }

    async getTransactions(): Promise<ITransaction[]> {
        return TransactionModel.find().exec();
    }

    async getBalanceByUser(userId: string): Promise<number> {
        const transactions = await TransactionModel.find({ userId }).exec();
        const receivedTransfers = await TransactionModel.find({ destinationUserId: userId, transactionType: TransactionType.TRANSFER }).exec();
        return this.calculateBalance(transactions, receivedTransfers);
    }

    async getBalanceByUserByDate(userId: string, date: Date): Promise<number> {
        const transactions = await TransactionModel.find({
            userId,
            createdAt: { $lte: date }
        }).exec();
        const receivedTransfers = await TransactionModel.find({
            destinationUserId: userId,
            transactionType: TransactionType.TRANSFER,
            createdAt: { $lte: date }
        }).exec();
        return this.calculateBalance(transactions, receivedTransfers);
    }

    async getStatementByUser(userId: string): Promise<ITransaction[]> {
        const transactions = await TransactionModel.find({ userId }).exec();
        const receivedTransfers = await TransactionModel.find({ destinationUserId: userId, transactionType: TransactionType.TRANSFER }).exec();
        return transactions.concat(receivedTransfers).sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    async updateAdvanceTransaction(transactionId: string, advanceAmount: number): Promise<ITransaction | null> {
        return TransactionModel.findByIdAndUpdate(
            transactionId,
            { advanceAmount },
            { new: true }
        ).exec();
    }

}
