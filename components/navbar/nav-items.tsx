import NavItem from "@/components/navbar/nav-item";
import { getChats } from "@/lib/actions/server";
import { auth } from "@/app/auth";
import { notFound } from "next/navigation";

export default async function NavItems() {
  const session = await auth();
  if (!session?.user?.id) notFound();
  const chats = await getChats(session.user.id);
  const sorted = chats?.sort(
    (a, b) =>
      new Date(b.updatedAt as Date).getTime() -
      new Date(a.updatedAt as Date).getTime(),
  );
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done");
    }, 2000);
  });
  await promise;
  return (
    <div>
      {sorted && sorted.length > 0 ? (
        sorted.map((chat, index) => <NavItem key={index} chat={chat} />)
      ) : (
        <span>No recent chats</span>
      )}
    </div>
  );
}