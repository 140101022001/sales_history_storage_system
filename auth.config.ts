import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import LoginSchema from "./prisma/schemas/LoginSchema";
import { getManagerByEmail } from "./lib/managers/get";
import { deCryptData } from "./lib/crypto";

export default {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await getManagerByEmail(email);
                    if (!user?.password) return null;
                    const comparePassword = password == deCryptData(user?.password);
                    if (!user || !comparePassword) return null
                    return user
                }
                return null
            }
        })
    ]
} satisfies NextAuthConfig