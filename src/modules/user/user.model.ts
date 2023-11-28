import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrder, TUser, UserMethods, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../app/config";



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

const UserSchema = new Schema<TUser, UserMethods, UserModel>({
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


//Creating Middleware

UserSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round))
    next()
})

UserSchema.post('save', async function(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    doc:any, next:any){
    delete doc.password;
    next();
})


//Instace for finding whether the user is avalable in the database or not
UserSchema.methods.isUserExists = async function(id:number){
    const existingUser = await UserMainModel.findOne({userId:id});
    return existingUser !== null;
}
UserSchema.methods.isUsernameExists = async function (username:string){
    const usernameExists = await UserMainModel.findOne({username})
    return usernameExists
}
export const UserMainModel = model<TUser, UserModel>('user', UserSchema, )