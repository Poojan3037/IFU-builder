import { ArrowLeft, Building2, Mail, ShieldCheck, Trash2, User } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { MOCK_USER } from "@/components/shared/mock-user";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Profile" };

const DETAILS = [
  { label: "Full name", value: MOCK_USER.name, icon: User },
  { label: "Email", value: MOCK_USER.email, icon: Mail },
  { label: "Company", value: MOCK_USER.companyName, icon: Building2 },
] as const;

const ProfilePage = () => (
  <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8 sm:px-6">
    <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
      <Link href="/dashboard">
        <ArrowLeft aria-hidden /> Back to Dashboard
      </Link>
    </Button>
    <Reveal className="flex items-center gap-4">
      <Avatar className="size-16 ring-4 ring-primary/15">
        <AvatarFallback className="bg-gradient-to-br from-primary to-info text-lg font-semibold text-primary-foreground">
          {MOCK_USER.initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{MOCK_USER.name}</h1>
        <p className="inline-flex items-center gap-1.5 text-sm text-success-soft-foreground">
          <ShieldCheck aria-hidden className="size-4" /> Email verified
        </p>
      </div>
    </Reveal>
    <Stagger as="div" trigger="mount" className="space-y-4">
      <StaggerItem className="rounded-2xl border bg-card shadow-sm">
        <h2 className="border-b px-5 py-3 text-sm font-semibold">Account details</h2>
        <dl className="divide-y">
          {DETAILS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 px-5 py-3.5 text-sm">
              <Icon aria-hidden className="size-4 text-muted-foreground" />
              <dt className="w-28 text-muted-foreground">{label}</dt>
              <dd className="min-w-0 truncate font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </StaggerItem>
      <StaggerItem className="rounded-2xl border border-danger/25 bg-danger-soft/40 p-5">
        <h2 className="text-sm font-semibold">Delete account</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Permanently delete your account and all IFU documents within 30 days, as required by the DPDP Act, 2023.
        </p>
        <Button variant="destructive" size="sm" className="mt-4" disabled>
          <Trash2 aria-hidden /> Delete account
        </Button>
      </StaggerItem>
    </Stagger>
  </main>
);

export default ProfilePage;
