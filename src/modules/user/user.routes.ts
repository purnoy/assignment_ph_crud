import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

//Requirement 1 - Create a new user
router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateUserInformation);
router.delete('/:userId', UserControllers.deleteUser);

export const UserRouter = router;
