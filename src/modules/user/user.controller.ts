import { Request, Response } from 'express';
import UserValidatedSchema from './user.validation';
import { UserServices } from './user.service';

//Requirement - 1 Create User
const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        const userZodValidated = UserValidatedSchema.parse(userData);
        const result = await UserServices.createUserFromDB(userZodValidated);
        const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            password,
            ...passwordLessResult
        } = result.toObject();

        res.status(200).json({
            success: true,
            message: 'Successfully Added a New Using ',
            data: passwordLessResult,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.status(404).json({
            success: false,
            message: err.message,
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
};

//Requirement - 2 Get User
const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getUsersFromDB();
        if (result.length > 0 && result !== undefined && result !== null) {
            res.status(200).json({
                success: true,
                message: 'Successfully found the userlist',
                data: result,
            });
        } else {
            throw Error('Could not find any Data');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message || 'Could Not Find any users',
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
};

//Requirement - 3 Get the single User
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await UserServices.getSingleUserFromDB(Number(userId));

        if (result) {
            res.status(200).json({
                success: true,
                message: 'Successfully found the userlist',
                data: result,
            });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message || 'Could Not Find the user',
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
};

//Requirement - 34 Update user information
const updateUserInformation = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        const userZodValidated = UserValidatedSchema.parse(userData);
        const { userId } = req.params;
        const result = await UserServices.updateUserInformationFromDB(
            Number(userId),
            userZodValidated,
        );

        if (result) {
            res.status(200).json({
                success: true,
                message: 'Successfully Updated the user information',
                data: result,
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message || 'Could Not Find the user',
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
};
export const UserControllers = {
    createUser,
    getUsers,
    getSingleUser,
    updateUserInformation,
};
