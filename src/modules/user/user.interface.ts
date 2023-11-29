import { Model } from 'mongoose';

export type TFullName = {
    firstName: string;
    lastName: string;
};

export type TAddress = {
    street: string;
    city: string;
    country: string;
};
export type TOrder = {
    productName: string;
    price: number;
    quantity: number;
};

export type TUser = {
    userId: number;
    username: string;
    password: string;
    fullName: TFullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: TAddress;
    orders: TOrder[];
};

export type UserMethods = {
    isUserExists(id: number): Promise<TUser | boolean | null>;
    isUsernameExists(username: string): Promise<TUser | null>;
};

export interface UserModel extends Model<TUser> {
    isUserExists(id: number): Promise<TUser | boolean | null>;
    isUsernameExists(username: string): Promise<TUser | boolean | null>;
}
