"use server"

import { signIn } from "@/auth";
import LoginSchema from "@/prisma/schemas/LoginSchema"
import { login_redirect } from "@/routes";
import { AuthError } from "next-auth";
import * as z from "zod"

const managerLogin = async (data: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(data);
    if (!validatedFields.success) return { error: 'Invalid fields!' }

    const {email, password} = validatedFields.data;
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: true,
            redirectTo: login_redirect[0]
        })
    } catch (err) {
        if (err instanceof AuthError) {
            switch (err.type) {
                case "CredentialsSignin":
                    return { error: 'Invalid credentials!'}
                default:
                    return { error: 'Something went wrong!'}
            }
            
        }
        throw err
    }
    return null
}

export default managerLogin;