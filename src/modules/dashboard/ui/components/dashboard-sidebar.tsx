"use client";
import React, { use } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HomeIcon, ImageIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Slides", href: "/slides", icon: ImageIcon },
  { label: "Videos", href: "/videos", icon: VideoIcon },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image
            src="/images/default.jpg"
            alt="logo"
            width={40}
            height={40}
            className="rounded-sm"
          />
          <p className="text-lg font-semibold">Family Slides</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-50 text-[#2a2d30]" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#678fb1]/30 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                      pathname === item.href &&
                        "bg-linear-to-r/oklch border-[#678fb1]/30"
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 w-full"
                    >
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
