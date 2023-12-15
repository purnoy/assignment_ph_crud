import { TOrder, TUser } from './user.interface';
import { UserMainModel } from './user.model';

//Requirement - 1 Create a new user
const createUserFromDB = async (userData: TUser) => {
    const user = new UserMainModel(userData);
    if (await UserMainModel.isUserExists(user.userId)) {
        throw new Error('User exists');
    }
    if (await UserMainModel.isUsernameExists(user.username)) {
        throw new Error('Username is already used');
    }
    const result = await user.save();
    //const { password, orders, ...finalResult } = result.toObject();
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

//Requirement - 2 Retrieve a list of all users
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
    if (!(await UserMainModel.isUserExists(id))) {
        throw new Error('This user is not available');
    }
    const existingUser = await UserMainModel.findOne({
        userId: id,
    });
    if (
        (await UserMainModel.isUserExists(userData.userId)) &&
        existingUser?.userId !== userData.userId
    ) {
        throw new Error('UserID can not be Changed');
    }
    if (
        (await UserMainModel.isUsernameExists(userData.username)) &&
        existingUser?.username !== userData.username
    ) {
        throw new Error('Username can not be Changed');
    }

    const result = await UserMainModel.findOneAndUpdate(
        { userId: id },
        { userData },
        {
            new: true,
            select: {
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
        },
    );
    return result;
};

//5. Delete a user
const deleteUserFromDB = async (userId: number) => {
    if (!(await UserMainModel.isUserExists(userId))) {
        throw new Error('User does not exist!! select a valid user');
    }
    await UserMainModel.deleteOne({ userId });
    return null;
};

//1. Add New Product in Order
const addOrUpdateOrdersFromDB = async (
    userWhoOrderedId: number,
    usersOrder: TOrder,
) => {
    if (!(await UserMainModel.isUserExists(userWhoOrderedId))) {
        throw new Error('This user Does not Exist');
    }

    await UserMainModel.updateOne(
        { userId: userWhoOrderedId },
        { $push: { orders: usersOrder } },
    );

    return null;
};

//2. Retrieve all orders for a specific user
const showAllOrdersFromDB = async (userId: number) => {
    if (!(await UserMainModel.isUserExists(userId))) {
        throw new Error('This user Does not Exist');
    }
    const result = await UserMainModel.findOne(
        { userId },
        { orders: 1, _id: 0 },
    );
    return result;
};

//3. Calculate Total Price of Orders for a Specific User
const getTotalPriceFromDB = async (userId: number) => {
    if (!(await UserMainModel.isUserExists(userId))) {
        throw new Error('This user Does not Exist');
    }
    const user = await UserMainModel.findOne({ userId });

    if (user?.orders?.length === 0) {
        throw new Error('This user has not ordered yet');
    }
    const result = await UserMainModel.aggregate([
        {
            $match: { userId },
        },
        {
            $unwind: '$orders',
        },
        {
            $group: {
                _id: false,
                totalPrice: {
                    $sum: {
                        $multiply: ['$orders.price', '$orders.quantity'],
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                totalPrice: 1,
            },
        },
    ]);

    return result;
};
export const UserServices = {
    createUserFromDB,
    getUsersFromDB,
    getSingleUserFromDB,
    updateUserInformationFromDB,
    deleteUserFromDB,
    addOrUpdateOrdersFromDB,
    showAllOrdersFromDB,
    getTotalPriceFromDB,
};
