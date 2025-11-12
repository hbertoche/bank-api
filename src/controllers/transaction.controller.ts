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
}

export const getTransactions = async (req: Request, res: Response) => {
}

export const getBalanceByUser = async (req: Request, res: Response) => {
}

export const getBalanceByUserByDate = async (req: Request, res: Response) => {
}

export const getStatementByUser = async (req: Request, res: Response) => {
}

export const updateAdvanceTransaction = async (req: Request, res: Response) => {
}