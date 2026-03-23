import { BookOpen, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

import { SidebarGroup, SidebarContent, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";

export default function NavLinks() {
  const links = [
    {
      label: "New chat",
      href: "/",
      icon: <Plus size={18} />,
    },
    {
      label: "History",
      href: "/history",
      icon: <BookOpen className="h-4 w-4" />,
    },
  ];
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href;
  };
  return (
    <SidebarGroup>
      <SidebarContent>
        <SidebarMenuItem>
          {links.map((link) => (
            <SidebarMenuButton tooltip={link.label} key={link.label} asChild>
              <Link
                href={link.href}
                className={cn("flex space-x-1", isActive(link.href) && "bg-muted")}
              >
                <div className={cn("flex items-center justify-center rounded-md")}>{link.icon}</div>

                <span className={"group-data-[collapsible=icon]:hidden "}>{link.label}</span>
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarMenuItem>
      </SidebarContent>
    </SidebarGroup>
  );
}
