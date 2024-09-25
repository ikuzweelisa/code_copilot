import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login ",
  description: "Login page",
};
export default async function Page() {
  return (
    <div className=" flex justify-center flex-col mt-20">
      <LoginForm />
    </div>
  );
}