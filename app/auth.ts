import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { cache } from "react";
import { db } from "~/lib/drizzle";

const {
  signIn,
  signOut,
  handlers,
  auth: isAuth,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      clientId: process.env.AUTH_GITHUB_ID,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/auth/error",
    signIn: "/auth/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub as string;
      return session;
    },
  },
});
const auth = cache(isAuth);

export { signIn, signOut, handlers, auth };
