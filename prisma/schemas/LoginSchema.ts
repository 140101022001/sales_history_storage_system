import * as z from "zod"

const LoginSchema = z.object({
    email: z.string().email({ message: 'Invalid Email!' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters!' }),
})


export default LoginSchema;