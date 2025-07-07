"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  MapPin,
  Calendar,
  FileText,
  Mail,
  Users,
  Settings,
  LogOut,
  ChevronUp,
  Bell,
} from "lucide-react";

const adminMenuItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Content Management",
    items: [
      {
        title: "Products",
        url: "/admin/products",
        icon: Package,
      },
      {
        title: "Farmlands",
        url: "/admin/farmlands",
        icon: MapPin,
      },
      {
        title: "Blog Posts",
        url: "/admin/blog",
        icon: FileText,
      },
    ],
  },
  {
    title: "Customer Management",
    items: [
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
      },
    ],
  },
  {
    title: "Marketing",
    items: [
      {
        title: "Newsletter",
        url: "/admin/newsletter",
        icon: Mail,
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-3 py-2">
          <Image
            src="/img/logo.png"
            alt="StartAgri Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <div>
            <h2 className="text-lg font-semibold">StartAgri</h2>
            <p className="text-muted-foreground text-xs">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {adminMenuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url}>
                          <Icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
