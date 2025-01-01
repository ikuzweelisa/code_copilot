import { LoginForm } from "~/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatBot-Login ",
  description: "Login page for the AI ChatBot",
};
export default async function Page() {
  return <LoginForm />;
}
