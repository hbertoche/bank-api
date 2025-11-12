import { Router } from 'express';
import {
    createTransaction,
    getTransactionById,
    getTransactions,
    getBalanceByUser,
    getBalanceByUserByDate,
    getStatementByUser,
    updateAdvanceTransaction
 } from '../controllers/transaction.controller';


const router = Router();

router.post('/', createTransaction);
router.get('/:id', getTransactionById);
router.get('/', getTransactions);
router.get('/balance/:userId', getBalanceByUser);
router.get('/balance/:userId/:date', getBalanceByUserByDate);
router.get('/statement/:userId', getStatementByUser);
router.put('/advance/:id', updateAdvanceTransaction);

export default router;
