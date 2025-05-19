"use client";
import {
  Home,
  Settings,
  Bell,
  PanelTop,
  NotepadText,
  CopyPlus,
  User,
  LucideLogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";
import { useTransition } from "react";

// Menu groups.
const groups = [
  {
    label: "Application",
    links: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Profile",
        url: "/profile",
        icon: User,
      },
      {
        title: "Notifications",
        url: "/notifications",
        icon: Bell,
      },
      {
        title: "My posts",
        url: "/my-posts",
        icon: PanelTop,
      },
      {
        title: "Drafts",
        url: "my-posts?filter=drafts",
        icon: NotepadText,
      },
    ],
  },
  {
    label: "Actions & Quick tools",
    links: [
      {
        title: "Create New post",
        url: "/new-post",
        icon: CopyPlus,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const[pending, startTransition] = useTransition();
  return (
    <Sidebar>
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.links.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton isActive={pathname === item.url} asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <button disabled={pending} onClick={() => startTransition(logout)} className="disabled:opacity-50 text-red-500 flex items-center px-2 mx-1 py-1 hover:bg-accent duration-100 rounded-md cursor-pointer gap-1 font-semibold">
          <LucideLogOut className="rotate-y-180" width="20" />
          <span>Logout</span>
        </button>
      </SidebarContent>
    </Sidebar>
  );
}
