import { Suspense } from "react";
import NavContent from "./nav-content";
import Spinner from "../ai/spinner";
import NavItems from "./nav-items";

export default function DesktopNavbar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-full hidden lg:w-80 lg:flex flex-col bg-background border-r">
      <NavContent>
        <Suspense
          fallback={
            <div className="mt-7 flex justify-center">
              <Spinner />
            </div>
          }
        >
          <NavItems />
        </Suspense>
      </NavContent>
    </aside>
  );
}
