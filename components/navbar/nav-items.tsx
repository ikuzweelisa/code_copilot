import NavItem from "@/components/navbar/nav-item";
import { Chat } from "@/lib/types";
import { getChats } from "@/lib/server";

export default async function NavItems() {
  const chats = (await getChats()) as Chat[];
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