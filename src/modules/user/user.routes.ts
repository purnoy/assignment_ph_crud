import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

//Requirement 1 - Create a new user
router.post('/', UserControllers.createUser)

export const UserRouter = router;