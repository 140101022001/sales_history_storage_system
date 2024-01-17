import * as z from "zod"

const addManagerSchema = z.object({
    email: z.string().email({ message: 'Invalid Email!' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters!' }),
})


export default addManagerSchema;