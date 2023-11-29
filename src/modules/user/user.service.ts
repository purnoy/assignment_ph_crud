import { TUser } from './user.interface';
import { UserMainModel } from './user.model';

//Requirement - 1 Create User
const createUserFromDB = async (userData: TUser) => {
    const user = new UserMainModel(userData);
    if (await UserMainModel.isUserExists(user.userId)) {
        throw new Error('User exists');
    }
    if (await UserMainModel.isUsernameExists(user.username)) {
        throw new Error('Username is already used');
    }
    const result = await user.save();
    const finalResult = {
        userId: result.userId,
        username: result.username,
        fullName: result.fullName,
        age: result.age,
        email: result.email,
        isActive: result.isActive,
        hobbies: result.hobbies,
        address: result.address,
    };

    return finalResult;
};

//Requirement - 2 Get User
const getUsersFromDB = async () => {
    const result = await UserMainModel.find(
        {},
        { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 },
    );
    return result;
};

//Requirement - 3 Retrieve a specific user by ID
const getSingleUserFromDB = async (userId: number) => {
    if (!(await UserMainModel.isUserExists(userId))) {
        throw new Error('This user is not available');
    }

    const result = await UserMainModel.findOne(
        { userId },
        {
            username: 1,
            userId: 1,
            fullName: 1,
            age: 1,
            email: 1,
            isActive: 1,
            hobbies: 1,
            address: 1,
            _id: 0,
        },
    ).select('-password');
    return result;
};

//Requirement - 4 Update user information
const updateUserInformationFromDB = async (id: number, userData: TUser) => {
    const updatedUser = new UserMainModel(userData);

    if (!(await UserMainModel.isUserExists(id))) {
        throw new Error('This user is not available');
    }
    const existingUser = await UserMainModel.findOne({
        userId: id,
    });
    if (
        updatedUser.userId !== existingUser?.userId ||
        updatedUser.username !== existingUser.username
    ) {
        throw new Error('Username Or UserID can not be Changed');
    }
    const result = await UserMainModel.findOneAndUpdate(
        { userId: id },
        { $set: { ...updatedUser.toObject(), _id: existingUser._id } },
        {
            new: true,
            select: '-password',
            username: 1,
            userId: 1,
            fullName: 1,
            age: 1,
            email: 1,
            isActive: 1,
            hobbies: 1,
            address: 1,
            _id: 0,
        },
    );
    return result;
};
export const UserServices = {
    createUserFromDB,
    getUsersFromDB,
    getSingleUserFromDB,
    updateUserInformationFromDB,
};
