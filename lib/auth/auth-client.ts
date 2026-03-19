import { polarClient } from "@polar-sh/better-auth";
import { customSessionClient,  lastLoginMethodClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./index";

const {
  useSession,
  signIn,
  signOut,
  $Infer,
  getLastUsedLoginMethod,
  listSessions,
  revokeSession,
  revokeOtherSessions,
  checkout,
  customer,
} = createAuthClient({
  plugins: [
    lastLoginMethodClient(),
    polarClient(),
    customSessionClient<typeof auth>(),
  ],
});
type Session = typeof $Infer.Session;
type TSession = typeof $Infer.Session.session;

export {
  useSession,
  signIn,
  signOut,
  type Session,
  getLastUsedLoginMethod,
  listSessions,
  type TSession,
  revokeSession,
  revokeOtherSessions,
  checkout,
  customer,
};
