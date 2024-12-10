
import NavItem from "@/components/navbar/nav-item";
import { getChats } from "@/lib/actions/server";
import { auth } from "@/app/auth";
import { notFound } from "next/navigation";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export default async function NavItems() {
  
  const session = await auth();
  if (!session) {
    notFound();
  }
  const chats = await getChats(session.user?.id);

  return (
    <SidebarMenu className=" w-full">
      {chats && chats?.length > 0 ? (
        chats?.map((chat) => <NavItem key={chat.id} chat={chat} />)
      ) : (
        <SidebarMenuItem className="mt-2 text-center">
          <SidebarMenuButton >No recent chats</SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
