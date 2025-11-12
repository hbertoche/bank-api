import { ITransaction, TransactionModel } from "../../src/models/transaction.model";
import { TransactionType } from "../../src/enums/transactionType.enum";
import { Types } from "mongoose";

jest.mock('../../src/models/transaction.model');

export const transactionDepositMock: ITransaction = {
  transactionType: TransactionType.DEPOSIT,
  amount: 1000,
  date: new Date("2025-11-12T10:00:00Z"),
  userId: new Types.ObjectId(),
} as ITransaction;

export const transactionWithdrawalMock: ITransaction = {
  transactionType: TransactionType.WITHDRAWAL,
  amount: 500,
  date: new Date("2025-11-13T10:00:00Z"),
  userId: new Types.ObjectId(),
} as ITransaction;

export const transactionTransferMock: ITransaction = {
  transactionType: TransactionType.TRANSFER,
  amount: 200,
  date: new Date("2025-11-14T10:00:00Z"),
  userId: new Types.ObjectId(),
  destinationUserId: new Types.ObjectId(),
} as ITransaction;

const mockSave = jest.fn();

export const setupTransactionModelMock = () => {
    (TransactionModel as any).mockImplementation((data: any) => ({
        ...data,
        save: mockSave
    }));
};

export const TransactionModelMock = {
    save: mockSave,
};