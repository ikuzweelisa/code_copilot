import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatBot-Login ",
  description: "Login page for the AI ChatBot",
};
export default async function Page() {
  return (
    <div className=" flex justify-center flex-col mt-20">
      <LoginForm />
    </div>
  );
}
