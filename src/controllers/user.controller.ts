import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = new UserModel(req.body);
        const createdUser = await userService.createUser(user);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(400).json({ error: 'Error creating user: ' + error });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: 'User not found: ' + error });
    }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching users: ' + error });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({ error: 'User not found: ' + error });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(404).json({ error: 'User not found: ' + error });
    }
};
