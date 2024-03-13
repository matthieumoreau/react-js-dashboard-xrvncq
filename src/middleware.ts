import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import {
  privateRoutes,
  authRoutes,
  DEFAULT_REDIRECT_LOGIN_URL,
  DEFAULT_REDIRECT_HOME_URL,
} from "@/lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const route = nextUrl.pathname;
  const isAuthenticated = !!req.auth;


  function checkAuthRoute(authRoute : string) {
    if(route.startsWith(authRoute)) {
      return true;
    }
    return;
  }

if(!!authRoutes.filter(checkAuthRoute).length) {
    if(isAuthenticated) {
        return Response.redirect(new URL(DEFAULT_REDIRECT_HOME_URL, nextUrl));
    } 
    return;    
}

if(route.startsWith(...authRoutes as [string])) {
    if(isAuthenticated) {
        return Response.redirect(new URL(DEFAULT_REDIRECT_HOME_URL, nextUrl));
    } 
    return;       
}

  if(privateRoutes.includes(route)) {
    if(!isAuthenticated) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_LOGIN_URL, nextUrl));
    }
    return;
  }

  return;

});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
