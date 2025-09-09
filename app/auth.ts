import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/lib/drizzle";
import { accounts, users } from "~/lib/drizzle/schema";

const { signIn, signOut, handlers, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Github({
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      clientId: process.env.AUTH_GITHUB_ID,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/auth/error",
    signIn: "/auth/login",
  },
  trustHost: true,
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

export { signIn, signOut, handlers, auth };
