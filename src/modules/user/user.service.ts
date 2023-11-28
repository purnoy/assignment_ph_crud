import { TUser } from "./user.interface";
import { UserMainModel } from "./user.model";

//Requirement - 1 Create User
const createUserFromDB = async (userData: TUser) =>{

    const user = new UserMainModel(userData);
    if(await user.isUserExists(user.userId)){
        throw new Error('User exists');
    }
    if(await user.isUsernameExists(user.username)){
        throw new Error('Username is already used');
    }
    const result = user.save();
    return result;
}


//Requirement - 2 Get User
const getUsersFromDB = async () =>{
    const result = await UserMainModel.find({}, {username:1, fullName:1, age:1, email:1, address:1 })
    return result;
}

//Requirement - 3 Retrieve a specific user by ID
const getSingleUserFromDB = async (userId: number, userData: TUser) =>{
    
    const user = new UserMainModel(userData);
    if (!(await user.isUserExists(userId))) {
        throw new Error('This user is not available');
    }
    const result = await UserMainModel.findOne({userId}).select('-password');
    return result;

}

export const UserServices = {
    createUserFromDB,
    getUsersFromDB,
    getSingleUserFromDB
}