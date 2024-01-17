import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from '@/auth.config';
import { getManagerById } from "./lib/managers/get";
import { db } from "./lib/prismadb";
import { Roles } from "@prisma/client";

type userType =  DefaultSession['user'] & {
    role: Roles
}

declare module "next-auth" {
    interface Session {
        user: userType
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    callbacks: {
        async jwt({token}) {
            if (!token.sub) return token
            const exitingManager = await getManagerById(token.sub);
            if (!exitingManager) return token
            token.role = exitingManager.role;
            return token
        },
        async session({ session, token, user }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            if (session.user && token.role) {
                session.user.role = token.role as Roles;
            }
            return session
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig
});