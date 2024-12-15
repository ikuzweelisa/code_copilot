import NavContent from "./nav-content";
import { auth } from "@/app/auth";

export default function Navbar() {
  const session = auth();
  return <NavContent sessionPromise={session} />;
}
