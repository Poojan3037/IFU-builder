"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/login", label: "Log In" },
  { href: "/signup", label: "Sign Up" },
] as const;

export const AuthTabs = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Log in or sign up" className="relative grid grid-cols-2 rounded-xl bg-muted p-1">
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative rounded-lg py-2 text-center text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="auth-tab-indicator"
                transition={SPRING.snappy}
                className="absolute inset-0 rounded-lg bg-background shadow-sm ring-1 ring-border"
              />
            )}
            <span className="relative">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
