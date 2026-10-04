"use client";

import { motion } from "motion/react";
import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/shared/Logo";
import { Magnetic, ScrollProgress } from "@/components/shared/motion";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { NAV_LINKS } from "../constants";
import { useScrolledPast } from "./MarketingNavbar.hooks";

export const MarketingNavbar = () => {
  const scrolled = useScrolledPast();

  return (
    <>
      <ScrollProgress />
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="sticky top-0 z-50 px-3 pt-3 sm:px-4"
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-transparent px-4 transition-all duration-500 ease-out-expo",
            scrolled ? "h-14 border-glass-border bg-background/80 shadow-lg shadow-primary/5 backdrop-blur-xl backdrop-saturate-150" : "h-16 bg-transparent",
          )}
        >
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Button asChild variant="ghost" className="hidden h-9 px-3 sm:inline-flex">
              <Link href="/login">Log in</Link>
            </Button>
            <Magnetic className="hidden sm:inline-block">
              <Button asChild className="h-9 rounded-full px-4 shadow-md shadow-primary/25">
                <Link href="/signup">
                  Get started <ArrowRight />
                </Link>
              </Button>
            </Magnetic>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                  {NAV_LINKS.map((link) => (
                    <a key={link.href} href={link.href} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted">
                      {link.label}
                    </a>
                  ))}
                  <div className="mt-4 flex flex-col gap-2">
                    <Button asChild variant="outline" className="h-10">
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild className="h-10">
                      <Link href="/signup">Get started</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </>
  );
};
