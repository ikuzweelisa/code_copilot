import { polarClient } from "@polar-sh/better-auth";
import { lastLoginMethodClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

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
  plugins: [lastLoginMethodClient(), polarClient()],
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
