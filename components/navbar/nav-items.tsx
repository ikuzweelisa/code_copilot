import NavItem from "@/components/navbar/nav-item";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import useSwr from "swr";
import { Chat } from "@/lib/types";
import { fetcher, groupChats } from "@/lib/utils";
import Spinner from "../ai/spinner";

import { MessageSquarePlus } from "lucide-react";
import { ChatsSkeleton } from "../skeletons";
export default function NavItems() {
  const { data: chats, isLoading } = useSwr<Array<Chat>>(
    "/api/chats",
    fetcher,
    {
      suspense: true,
      fallbackData: [],
    },
  );
  const groupedChats = groupChats(chats || []);

  return (
    <>
      {isLoading ? (
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-center items-center gap-2">
            <Spinner /> Loading chats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <ChatsSkeleton />
          </SidebarGroupContent>
        </SidebarGroup>
      ) : chats && chats.length > 0 ? (
        <>
          {groupedChats.today.length > 0 && (
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>Today</SidebarGroupLabel>
              <SidebarGroupContent>
                {groupedChats.today.map((chat) => (
                  <NavItem key={chat.id} chat={chat} />
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          )}
          {groupedChats.yesterday.length > 0 && (
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>Yesterday</SidebarGroupLabel>
              <SidebarGroupContent>
                {groupedChats.yesterday.map((chat) => (
                  <NavItem key={chat.id} chat={chat} />
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          )}
          {groupedChats.lastWeek.length > 0 && (
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>Previous 7 Days</SidebarGroupLabel>
              <SidebarGroupContent>
                {groupedChats.lastWeek.map((chat) => (
                  <NavItem key={chat.id} chat={chat} />
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          )}
          {groupedChats.lastMonth.length > 0 && (
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>Last Month</SidebarGroupLabel>
              <SidebarGroupContent>
                {groupedChats.lastMonth.map((chat) => (
                  <NavItem key={chat.id} chat={chat} />
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          )}
          {groupedChats.older.length > 0 && (
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>Older Chats</SidebarGroupLabel>
              <SidebarGroupContent>
                {groupedChats.older.map((chat) => (
                  <NavItem key={chat.id} chat={chat} />
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </>
      ) : (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <MessageSquarePlus size={20} />
                <span className="ml-2">No recent chats</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
    </>
  );
}
