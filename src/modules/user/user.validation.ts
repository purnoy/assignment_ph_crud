import { z } from'zod';

const FullNameValidatedSchema = z.object({
    firstName: z.string(),
    lastName: z.string()
});

const AddressValidatedSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string()
})

const OrderValidatedSchema = z.object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
})

const UserValidatedSchema = z.object({
    userId: z.number(),
    username: z.string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
      }),
    password: z.string(),
    fullName: FullNameValidatedSchema,
    age: z.number({
        required_error: "Age number is required",
        invalid_type_error: "Age number must be a number",
      }),
    email: z.string().email(),
    isActive: z.boolean().default(true),
    hobbies: z.array(z.string()),
    address: AddressValidatedSchema,
    orders:z.array(OrderValidatedSchema)
})

export default UserValidatedSchema;
