import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession, lastLoginMethod } from "better-auth/plugins";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "../drizzle";
import { user } from "../drizzle/schema";
import { findUser } from "../server/helpers";
import { Plan } from "../types";

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,

  server: "sandbox",
});

const planFromProductId = (productId?: string | null): Plan | null => {
  if (!productId) return null;
  if (productId === process.env.POLAR_PRO_PRODUCT_ID) return "PRO";
  if (productId === process.env.POLAR_PRO_PLUS_PRODUCT_ID) return "PRO_PLUS";
  return null;
};
const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [
    lastLoginMethod(),
    customSession(async ({ user, session }) => {
      const userDetails = await findUser(user.id);
      if (!userDetails) throw new Error("something went wrong");
      return {
        user,
        session: {
          ...session,
          plan: userDetails.plan,
        },
      };
    }),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          //TODO:save product in db
          products: [
            {
              productId: process.env.POLAR_PRO_PRODUCT_ID!,
              slug: "PRO",
            },
            {
              productId: process.env.POLAR_PRO_PLUS_PRODUCT_ID!,
              slug: "PRO_PLUS",
            },
          ],
          successUrl: "/",
        }),
        portal(),
        usage(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,
          onCustomerCreated: async (payload) => {
            const customerId = payload?.data.id;
            const email = payload.data?.email;
            console.log("customer created",customerId,payload)
            if (!customerId || !email) return;
            await db.update(user).set({ polarCustomerId: customerId }).where(eq(user.email, email));
          },
          onCustomerUpdated: async (payload) => {
            const customerId = payload?.data.id;
            const email = payload.data?.email;
            console.log("customer created",customerId,payload)
            if (!customerId || !email) return;
            await db.update(user).set({ polarCustomerId: customerId }).where(eq(user.email, email));
          },
          onSubscriptionActive: async (payload) => {
            console.log("pay",payload)
            const plan = planFromProductId(payload.data.productId);
            if (!plan) return;
            const customerId = payload.data.customerId;
            if (customerId) {
              await db.update(user).set({ plan }).where(eq(user.polarCustomerId, customerId));
            }
          },
          onSubscriptionUpdated: async (payload) => {
            console.log("pay",payload)
            const plan = planFromProductId(payload?.data.productId);
            if (!plan) return;
            const customerId = payload.data.customerId;
            if (customerId) {
              await db.update(user).set({ plan }).where(eq(user.polarCustomerId, customerId));
            }
          },
          onSubscriptionRevoked: async (payload) => {
            const customerId = payload.data.customerId;
            console.log("pay",payload)
            if (customerId) {
              await db
                .update(user)
                .set({ plan: "FREE" })
                .where(eq(user.polarCustomerId, customerId));
            }
          },
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
