import { Request, Response } from "express";
import UserValidatedSchema from './user.validation';
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) =>{
    try{
        const { user: userData } = req.body;
        const userZodValidated = UserValidatedSchema.parse(userData);
        const result = await UserServices.createUserFromDB(userZodValidated)
        const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            password
            , ...passwordLessResult} = result.toObject();

        res.status(200).json({
            "success": true,
            "message": "Successfully Added a New Using ",
            "data": passwordLessResult
        })
     }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(err:any){
        res.status(404).json({
            "success": false,
            "message": err.message ,
            "error": {
                "code": 404,
                "description": err.message
            }
        })
    }
}

export const UserControllers = {
    createUser
}