import { z } from'zod';

const FullNameSchema = z.object({
    firstName: z.string(),
    lastName: z.string()
});

const AddressSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string()
})

const OrderSchema = z.object({
    productName: z.string(),
    price: z.string(),
    quantity: z.string(),
})

const UserSchema = z.object({
    userId: z.number(),
    username: z.string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
      }),
    password: z.string(),
    fullName: FullNameSchema,
    age: z.number({
        required_error: "Age number is required",
        invalid_type_error: "Age number must be a number",
      }),
    email: z.string().email(),
    isActive: z.boolean().default(true),
    hobbies: z.array(z.string()),
    address: AddressSchema,
    orders:z.array(OrderSchema)
})

export default UserSchema;
