import NextAuth from "next-auth";
import authConfig from '@/auth.config';
import { apiAuthPrefix, authRoutes, login_redirect, publicRoutes } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    const isPublicRouter = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return null
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(login_redirect[0], nextUrl))
        }
        return null
    }

    if(!isLoggedIn && !isPublicRouter) {
        return Response.redirect(new URL('/login', nextUrl))
    }

    return null
})

export const config = { matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"] }