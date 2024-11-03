import NavItem from "@/components/navbar/nav-item";
import { getChats } from "@/lib/actions/server";
import { auth } from "@/app/auth";
import { notFound } from "next/navigation";

export default async function NavItems() {
  const session = await auth();
  if (!session?.user?.id) notFound();
  const chats = await getChats(session.user.id);

  return (
    <>
      {chats && chats.length > 0 ? (
        chats.map((chat, index) => <NavItem key={index} chat={chat} />)
      ) : (
        <span className="text-center">No recent chats</span>
      )}
    </>
  );
}
