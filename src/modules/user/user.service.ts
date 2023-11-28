import { TUser } from "./user.interface";
import { UserMainModel } from "./user.model";

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

export const UserServices = {
    createUserFromDB,
}