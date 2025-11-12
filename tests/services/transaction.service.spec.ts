import { TransactionService } from '../../src/services/transaction.service';
import { transactionDepositMock, transactionTransferMock, transactionWithdrawalMock, TransactionModelMock, setupTransactionModelMock } from '../mocks/transaction.mock';

describe('TransactionService', () => {
    let service: TransactionService;

    beforeEach(() => {
        service = new TransactionService();
        jest.clearAllMocks();
        setupTransactionModelMock();
    });

   it('should create a deposit transaction', async () => {
       TransactionModelMock.save.mockResolvedValue(transactionDepositMock);
       const result = await service.createTransaction(transactionDepositMock);
       expect(result).toEqual(transactionDepositMock);
   });

   it('should create a withdrawal transaction', async () => {
       TransactionModelMock.save.mockResolvedValue(transactionWithdrawalMock);
       const result = await service.createTransaction(transactionWithdrawalMock);
       expect(result).toEqual(transactionWithdrawalMock);
   });

    it('should create a transfer transaction', async () => {
        TransactionModelMock.save.mockResolvedValue(transactionTransferMock);
        const result = await service.createTransaction(transactionTransferMock);
        expect(result).toEqual(transactionTransferMock);
    });
});
