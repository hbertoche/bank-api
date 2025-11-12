import { TransactionType } from "../enums/transactionType.enum";
import { ITransaction, TransactionModel } from "../models/transaction.model";

export class TransactionService {
    private calculateBalance(transactions: ITransaction[], receivedTransfers: ITransaction[]): number {
        const receivedBalance = receivedTransfers.reduce((total, transaction) => {
            if (transaction.transactionType === TransactionType.REVERSAL_TRANSFER) {
                return total - transaction.amount;
            }
            return total + transaction.amount;
        }, 0);
        const transactionBalance = transactions.reduce((total, transaction) => {
            switch (transaction.transactionType) {
                case TransactionType.DEPOSIT:
                case TransactionType.REVERSAL_WITHDRAWAL:
                case TransactionType.REVERSAL_TRANSFER:
                    return total + transaction.amount;
                case TransactionType.WITHDRAWAL:
                case TransactionType.REVERSAL_DEPOSIT:
                case TransactionType.TRANSFER:
                    return total - transaction.amount;
            }
        }, 0);

        return receivedBalance + transactionBalance;
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
        const receivedTransactions = await TransactionModel.find({ destinationUserId: userId,
             transactionType: { $in: [TransactionType.TRANSFER, TransactionType.REVERSAL_TRANSFER] } }).exec();
        return this.calculateBalance(transactions, receivedTransactions);
    }

    async getBalanceByUserByDate(userId: string, date: Date): Promise<number> {
        const transactions = await TransactionModel.find({
            userId,
            date: { $lte: date }
        }).exec();
        const receivedTransfers = await TransactionModel.find({
            destinationUserId: userId,
            transactionType: {
                $in: [TransactionType.TRANSFER, TransactionType.REVERSAL_TRANSFER]
            },
            date: { $lte: date }
            }).exec();
        return this.calculateBalance(transactions, receivedTransfers);
    }

    async getStatementByUser(userId: string): Promise<ITransaction[]> {
        const transactions = await TransactionModel.find({ userId }).exec();
        const receivedTransfers = await TransactionModel.find({ destinationUserId: userId, transactionType: TransactionType.TRANSFER }).exec();
        return transactions.concat(receivedTransfers).sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    async updateAdvanceTransaction(transactionId: string, newDate: Date): Promise<ITransaction | null> {
        const originalTransaction = await TransactionModel.findById(transactionId).exec();
        if (!originalTransaction) {
            throw new Error('Transaction not found');
        }

        if (originalTransaction.date >= newDate) {
            throw new Error('New date must be before the original date');
        }

        let reversalType: TransactionType;
        switch (originalTransaction.transactionType) {
            case TransactionType.DEPOSIT:
                reversalType = TransactionType.REVERSAL_DEPOSIT;
                break;
            case TransactionType.WITHDRAWAL:
                reversalType = TransactionType.REVERSAL_WITHDRAWAL;
                break;
            case TransactionType.TRANSFER:
                reversalType = TransactionType.REVERSAL_TRANSFER;
                break;
            default:
                throw new Error('Only DEPOSIT, WITHDRAWAL and TRANSFER can be advanced');
        }

        const reversalTransaction = new TransactionModel({
            userId: originalTransaction.userId,
            destinationUserId: originalTransaction.destinationUserId,
            originalTransactionId: originalTransaction._id,
            transactionType: reversalType,
            amount: originalTransaction.amount,
            date: originalTransaction.date,
        });
        await reversalTransaction.save();

        const newTransaction = new TransactionModel({
            userId: originalTransaction.userId,
            destinationUserId: originalTransaction.destinationUserId,
            originalTransactionId: originalTransaction._id,
            transactionType: originalTransaction.transactionType,
            amount: originalTransaction.amount,
            date: newDate,
        });
        await newTransaction.save();

        return newTransaction;
    }

}
