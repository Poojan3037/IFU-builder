import { Languages } from "lucide-react";

import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";

/** Global header for authenticated screens (FR-GLB-01). */
export const AppHeader = () => (
  <header className="glass sticky top-0 z-40 border-x-0 border-t-0">
    <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
      <Logo href="/dashboard" compact />
      <div className="flex items-center gap-1.5">
        <span
          title="Language — English only in v1"
          className="inline-flex items-center gap-1 rounded-full border bg-background/60 px-2.5 py-1 text-xs font-medium text-muted-foreground"
        >
          <Languages aria-hidden className="size-3.5" />
          EN
        </span>
        <ThemeToggle />
        <UserMenu />
      </div>
    </div>
  </header>
);
