import { z } from 'zod';

const FullNameValidatedSchema = z.object({
    firstName: z.string({
        required_error: 'First name is required',
        invalid_type_error: 'First name must be a string',
    }),
    lastName: z.string({
        required_error: 'Last name is required',
        invalid_type_error: 'Last name must be a string',
    }),
});

const AddressValidatedSchema = z.object({
    street: z.string({
        required_error: 'Street is required',
        invalid_type_error: 'Street must be a string',
    }),
    city: z.string({
        required_error: 'City is required',
        invalid_type_error: 'City must be a string',
    }),
    country: z.string({
        required_error: 'Country is required',
        invalid_type_error: 'Country must be a string',
    }),
});

export const OrderValidatedSchema = z.object({
    productName: z.string({
        required_error: 'Product name is required',
        invalid_type_error: 'Product name must be a string',
    }),
    price: z.number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
    }),
    quantity: z.number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
    }),
});

const UserValidatedSchema = z.object({
    userId: z.number({
        required_error: 'User ID is required',
        invalid_type_error: 'User ID must be a number',
    }),
    username: z.string({
        required_error: 'Username is required',
        invalid_type_error: 'Username must be a string',
    }),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    }),
    fullName: FullNameValidatedSchema,
    age: z.number({
        required_error: 'Age is required',
        invalid_type_error: 'Age must be a number',
    }),
    email: z
        .string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a valid email address',
        })
        .email(),
    isActive: z
        .boolean({
            required_error: 'isActive is required',
            invalid_type_error: 'isActive must be a boolean',
        })
        .default(true),
    hobbies: z.array(
        z.string({
            required_error: 'Hobbies must be an array of strings',
            invalid_type_error: 'Hobbies must be an array of strings',
        }),
    ),
    address: AddressValidatedSchema,
    orders: z.array(OrderValidatedSchema).optional(),
});

export default UserValidatedSchema;
