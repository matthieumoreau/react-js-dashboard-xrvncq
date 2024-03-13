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
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
} satisfies NextAuthConfig;
