import Link from "next/link";

import { Logo } from "@/components/shared/Logo";
import { DISCLAIMER } from "@/features/ifu-wizard/constants";

const FOOTER_LINKS = [
  { heading: "Product", links: [["How it works", "#how-it-works"], ["Features", "#features"], ["Compliance", "#compliance"], ["FAQ", "#faq"]] },
  { heading: "Account", links: [["Log in", "/login"], ["Sign up", "/signup"], ["Forgot password", "/forgot-password"]] },
  { heading: "Legal", links: [["Terms of Service", "#"], ["Privacy Policy", "#"], ["DPDP rights", "#"]] },
] as const;

export const MarketingFooter = () => (
  <footer className="border-t bg-muted/20">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
      <div className="space-y-4">
        <Logo />
        <p className="max-w-xs text-sm text-muted-foreground">
          Guided IFU drafting for Indian medical-device manufacturers and importers.
        </p>
      </div>
      {FOOTER_LINKS.map((group) => (
        <nav key={group.heading} aria-label={group.heading} className="space-y-3">
          <p className="text-sm font-semibold">{group.heading}</p>
          <ul className="space-y-2">
            {group.links.map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
    <div className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl">{DISCLAIMER}</p>
        <p className="shrink-0">© 2026 Smart IFU Builder · Made in India</p>
      </div>
    </div>
  </footer>
);
