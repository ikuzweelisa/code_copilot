import NavItem from "@/components/navbar/nav-item";
import { getChats } from "@/lib/server";
import { auth } from "@/app/auth";

export default async function NavItems() {
  const session = await auth();
  const chats = await getChats(session?.user?.id);
  return (
    <div>
      {chats && chats.length > 0 ? (
        chats.map((chat, index) => <NavItem key={index} chat={chat} />)
      ) : (
        <span>No recent chats</span>
      )}
    </div>
  );
}