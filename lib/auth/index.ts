import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { Polar
} from "@polar-sh/sdk";
//  Add server only
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { lastLoginMethod } from "better-auth/plugins";
import { headers } from "next/headers";

import { db } from "../drizzle";

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,

  server: "sandbox",
});

const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [
    lastLoginMethod(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: process.env.POLAR_PRO_PLUS_PRODUCT_ID!,
              slug: "pro",
            },
            {
              productId: process.env.POLAR_PRO_PLUS_PRODUCT_ID!,
              slug: "pro-plus",
            },
          ],
          successUrl: "/",
        }),
        portal(),
        usage(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,
        }),
      ],
    }),
  ],
  account: {
    accountLinking: {
      trustedProviders: ["google", "github", "apple", "gitlab", "email-password"],
    },
    skipStateCookieCheck: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
const signIn = async (provider: "google" | "github") =>
  await auth.api.signInSocial({
    body: {
      provider,
    },
  });
const signOut = async () =>
  await auth.api.signOut({
    headers: await headers(),
  });

const getSession = async () => await auth.api.getSession({ headers: await headers() });

export { auth, signIn, signOut, getSession };
