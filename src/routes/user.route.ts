import { Router } from 'express';
import {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
 } from '../controllers/user.controller';


const router = Router();

router.post('/', createUser);
router.get('/:id', getUserById);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
