import { Request, Response } from 'express';
import UserValidatedSchema from './user.validation';
import { UserServices } from './user.service';

//Requirement - 1 Create a new user
const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        const userZodValidated = UserValidatedSchema.parse(userData);
        const result = await UserServices.createUserFromDB(userZodValidated);
        res.status(200).json({
            success: true,
            message: 'Successfully Added a New Using ',
            data: result,
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

//Requirement - 2 Retrieve a list of all users
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

//Requirement - 3 Retrieve a specific user by ID
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

//Requirement - 4 Update user information
const updateUserInformation = async (req: Request, res: Response) => {
    try {
        const userZodValidated = UserValidatedSchema.parse(req.body);
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

//5. Delete a user
const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await UserServices.deleteUserFromDB(Number(userId));

        if (result && result !== undefined && result !== null) {
            res.status(200).json({
                success: true,
                message: 'Successfully Deleted the data',
                data: result,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Data Could not Deleted',
                data: result,
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Invalid Data',
            err,
        });
    }
};

//1. Add New Product in Order
const addOrUpdateOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const usersOrder = req.body;
        const result = await UserServices.addOrUpdateOrdersFromDB(
            Number(userId),
            usersOrder,
        );
        res.status(200).json({
            success: true,
            message: 'Successfull added the order',
            data: result,
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Invalid Data',
            err,
        });
    }
};

//2. Retrieve all orders for a specific user
const showAllOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await UserServices.showAllOrdersFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Successfully shown the data',
            data: result,
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Invalid Data',
            err,
        });
    }
};

//3. Calculate Total Price of Orders for a Specific User
const getTotalPrice = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const result = await UserServices.getTotalPriceFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Successfully shown the data',
            data: result,
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Invalid Data',
            err,
        });
    }
};

export const UserControllers = {
    createUser,
    getUsers,
    getSingleUser,
    updateUserInformation,
    deleteUser,
    addOrUpdateOrders,
    showAllOrders,
    getTotalPrice,
};
