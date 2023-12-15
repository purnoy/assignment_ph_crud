import { Schema, model } from 'mongoose';
import {
    TAddress,
    TFullName,
    TOrder,
    TUser,
    UserMethods,
    UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../app/config';

const FullNameSchema = new Schema<TFullName>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    {
        _id: false,
    },
);

const AddressSchema = new Schema<TAddress>(
    {
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
    },
    {
        _id: false,
    },
);

const OrderSchema = new Schema<TOrder>(
    {
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    },
    {
        _id: false,
    },
);

const UserSchema = new Schema<TUser, UserMethods, UserModel>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: FullNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    hobbies: { type: [String], required: true },
    address: { type: AddressSchema, required: true },
    orders: [OrderSchema],
});

//Creating Middleware

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_round),
    );
    next();
});

UserSchema.post(
    'save',
    async function (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        doc: any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        next: any,
    ) {
        delete doc.password;
        next();
    },
);

//Query Middleware

UserSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const data = this;
    data.password = await bcrypt.hash(
        data.password,
        Number(config.bcrypt_salt_round),
    );
    next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const data = this.getUpdate() as Partial<TUser>;
    // Check if the update operation includes the password field
    if (data.password) {
        data.password = await bcrypt.hash(
            data.password,
            Number(config.bcrypt_salt_round),
        );
    }
    next();
});

UserSchema.pre('find', async function (next) {
    this.select({ password: 0 });
    next();
});
UserSchema.pre('findOne', async function (next) {
    this.select({ password: 0 });
    next();
});
UserSchema.pre('aggregate', async function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    this.pipeline().push({ $project: { password: 0 } });
    next();
});

UserSchema.post(
    'save',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function (doc: any, next) {
        // forcing doc to any to delete password as it is required on user type

        delete doc.password;

        next();
    },
);

//Instace for finding whether the user is avalable in the database or not
UserSchema.statics.isUserExists = async function (userId: number) {
    return !!(await UserMainModel.findOne({ userId }));
};
UserSchema.statics.isUsernameExists = async function (username: string) {
    return !!(await UserMainModel.findOne({ username }));
};
export const UserMainModel = model<TUser, UserModel>('user', UserSchema);
