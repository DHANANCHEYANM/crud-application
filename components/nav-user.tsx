"use client";

import { useEffect, useState } from "react";
import { ChevronsUpDown, LogOut } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  useSession,
  signOut,
} from "@/lib/auth-client";

export function NavUser() {
  const { isMobile } = useSidebar();

  const { data: session } =
    useSession();

  const [user, setUser] =
    useState({
      name: "",
      email: "",
      avatar: "",
    });

  useEffect(() => {
    console.log(
      "SESSION:",
      session
    );

    if (session?.user) {
      setUser({
        name:
          session.user.name || "",
        email:
          session.user.email || "",
        avatar:
          session.user.image || "",
      });
    }
  }, [session]);

  const handleLogout =
    async () => {
      await signOut();

      window.location.href =
        "/login";
    };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                />

                <AvatarFallback className="rounded-lg">
                  {user.name
                    ?.charAt(0)
                    ?.toUpperCase() ||
                    "U"}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user.name ||
                    "User"}
                </span>

                <span className="truncate text-xs">
                  {user.email ||
                    "No Email"}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={
              isMobile
                ? "bottom"
                : "right"
            }
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem
              onClick={
                handleLogout
              }
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}