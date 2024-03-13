import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            "https://freddy.codesubmit.io/login",
            { username: credentials.username, password: credentials.password }
          );
          const user = response.data;
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          return { status: "error", message: "Error" };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {

if (user) {
        token.accessToken = user.access_token;
        token.refreshToken = user.refresh_token;
        token.expires = Date.now() + 15 * 60 * 1000; // 15 minutes
      }

      // Check if access token has expired
      if (token.expires && Date.now() > token.expires) {
        try {
          const res = await fetch('https://freddy.codesubmit.io/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.refreshToken}`,
            },
          });
          const data = await res.json();

          console.log('data', data);

          if (res.ok) {
            token.accessToken = data.access_token;
            token.expires = Date.now() + 15 * 60 * 1000; // 15 minutes
          }
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expires = token.expires;
      return session;
    },
  },
} satisfies NextAuthConfig;
