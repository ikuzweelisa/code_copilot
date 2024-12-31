import { BookOpen } from "lucide-react";
import {
  SidebarGroup,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import Link from "next/link";

import { AssitantIcon } from "../ui/icons";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavLinks() {
  const links = [
    {
      label: "New chat",
      href: "/",
      icon: <AssitantIcon size={18} />,
    },
    {
      label: "History",
      href: "/history",
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href;
  };
  return (
    <SidebarGroup>
      <SidebarContent className="list-none">
        <SidebarMenuItem>
          {links.map((link) => (
            <SidebarMenuButton key={link.label} asChild>
              <Link
                href={link.href}
                className={cn(
                  "flex space-x-1",
                  isActive(link.href) && "bg-muted"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center rounded-md p-1",
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground"
                      : "bg-background"
                  )}
                >
                  {link.icon}
                </div>

                <span className={"group-data-[collapsible=icon]:hidden "}>
                  {link.label}
                </span>
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarMenuItem>
      </SidebarContent>
    </SidebarGroup>
  );
}
