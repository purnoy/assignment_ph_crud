import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrder, TUser } from "./user.interface";

const FullNameSchema = new Schema<TFullName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
})

const AddressSchema = new Schema<TAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
})

const OrderSchema = new Schema<TOrder>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

const UserSchema = new Schema<TUser>({
    userId: { type: Number, required: true, unique:true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: FullNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    hobbies: { type: [String], required: true },
    address: { type: AddressSchema, required: true },
    orders: { type: [OrderSchema], required: true },
})

export const UserMainModel = model<TUser>('user', UserSchema)