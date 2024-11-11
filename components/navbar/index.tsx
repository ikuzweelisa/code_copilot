import { getChats } from "@/lib/actions/server";
import NavContent from "./nav-content";
import { auth } from "@/app/auth";
import { Suspense } from "react";
import Spinner from "../ai/spinner";
import { SidebarGroupContent } from "../ui/sidebar";
import NavItems from "./nav-items";

export default async function Navbar() {
  const session = auth();

  return (
    <NavContent sessionPromise={session}>
      <SidebarGroupContent>
        <Suspense
          fallback={
            <div className={"flex justify-center items-center mt-6"}>
              <Spinner />
            </div>
          }
        >
          <NavItems />
        </Suspense>
      </SidebarGroupContent>
    </NavContent>
  );
}
