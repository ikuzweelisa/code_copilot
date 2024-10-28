import { Suspense } from "react";
import Spinner from "../ai/spinner";
import DesktopNavbar from "./desktop-navbar";
import MobileNav from "./mobile-nav";
import NavItems from "./nav-items";

export default function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNav>
        <Suspense
          fallback={
            <div className="mt-7 flex justify-center">
              <Spinner />
            </div>
          }
        >
          <NavItems />
        </Suspense>
      </MobileNav>
    </>
  );
}
