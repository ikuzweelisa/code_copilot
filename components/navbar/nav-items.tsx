import NavItem from "@/components/navbar/nav-item";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import useSwr from "swr";
import { Chat } from "@/lib/types";
import { fetcher } from "@/lib/utils";
import Spinner from "../ai/spinner";
export default function NavItems() {
  const { data: chats, isLoading } = useSwr<Array<Chat>>("/api/chat", fetcher, {
    suspense: true,
    fallbackData: [],
  });
  return (
    <SidebarMenu className=" w-full">
      {isLoading && (
        <div className={"flex justify-center items-center mt-6"}>
          <Spinner />
        </div>
      )}
      {chats && chats?.length > 0 ? (
        chats?.map((chat) => <NavItem key={chat.id} chat={chat} />)
      ) : (
        <>
          {!isLoading ? (
            <SidebarMenuItem className="mt-2 text-center">
              <SidebarMenuButton>No recent chats</SidebarMenuButton>
            </SidebarMenuItem>
          ) : null}
        </>
      )}
    </SidebarMenu>
  );
}
