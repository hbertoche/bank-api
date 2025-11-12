import { Request, Response } from 'express';
import { TransactionModel } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';

const transactionService = new TransactionService();

export const createTransaction = async (req: Request, res: Response) => {
    try {
        const transaction = new TransactionModel(req.body);
        const createdTransaction = await transactionService.createTransaction(transaction);

        res.status(201).json(createdTransaction);
    } catch (error) {
        res.status(400).json({ error: 'Error creating transaction: ' + error });
    }
}

export const getTransactionById = async (req: Request, res: Response) => {
    try {
        const transaction = await transactionService.getTransactionById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching transaction: ' + error });
    }
}

export const getTransactions = async (req: Request, res: Response) => {
    try {
        const transactions = await transactionService.getTransactions();
        res.json(transactions);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching transactions: ' + error });
    }
}

export const getBalanceByUser = async (req: Request, res: Response) => {
    try {
        const balance = await transactionService.getBalanceByUser(req.params.userId);
        res.json({ balance });
    } catch (error) {
        res.status(400).json({ error: 'Error fetching balance: ' + error });
    }
}

export const getBalanceByUserByDate = async (req: Request, res: Response) => {
    try {
        const balance = await transactionService.getBalanceByUserByDate(req.params.userId, new Date(req.params.date));
        res.json({ balance });
    } catch (error) {
        res.status(400).json({ error: 'Error fetching balance by date: ' + error });
    }
}

export const getStatementByUser = async (req: Request, res: Response) => {
    try {
        const statement = await transactionService.getStatementByUser(req.params.userId);
        res.json(statement);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching statement: ' + error });
    }
}

export const updateAdvanceTransaction = async (req: Request, res: Response) => {
    try {
        const updatedTransaction = await transactionService.updateAdvanceTransaction(req.params.id, new Date(req.body.date));
        res.json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ error: 'Error updating transaction: ' + error });
    }
}