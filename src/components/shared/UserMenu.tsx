"use client";

import { LogOut, User } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOutAction } from "@/features/auth/actions";

import { getInitials } from "./user";

interface UserMenuProps {
  user: { name: string; email: string };
}

export const UserMenu = ({ user }: UserMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      aria-label="Open account menu"
      className="rounded-full outline-none ring-offset-2 ring-offset-background transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Avatar className="size-8 ring-2 ring-primary/20">
        <AvatarFallback className="bg-gradient-to-br from-primary to-info text-xs font-semibold text-primary-foreground">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-60">
      <DropdownMenuLabel className="flex flex-col gap-0.5 font-normal">
        <span className="text-sm font-medium text-foreground">{user.name}</span>
        <span className="truncate text-xs text-muted-foreground">{user.email}</span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/profile">
          <User /> Profile
        </Link>
      </DropdownMenuItem>
      <form action={signOutAction}>
        <DropdownMenuItem asChild>
          <button type="submit" className="w-full">
            <LogOut /> Log out
          </button>
        </DropdownMenuItem>
      </form>
    </DropdownMenuContent>
  </DropdownMenu>
);
