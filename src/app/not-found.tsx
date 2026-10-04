import { ArrowLeft, FileQuestion, LayoutDashboard } from "lucide-react";
import Link from "next/link";

import { GradientBackdrop } from "@/components/shared/GradientBackdrop";
import { Logo } from "@/components/shared/Logo";
import { Reveal } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <main className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 text-center">
    <GradientBackdrop />
    <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
      <Logo />
    </div>
    <Reveal variant="scaleIn">
      <span className="glass mx-auto grid size-16 place-items-center rounded-2xl text-primary shadow-lg">
        <FileQuestion aria-hidden className="size-8" />
      </span>
    </Reveal>
    <Reveal delay={0.1}>
      <p className="text-gradient mt-8 font-mono text-7xl font-semibold tracking-tight sm:text-8xl">404</p>
    </Reveal>
    <Reveal delay={0.2}>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">We couldn&apos;t find that page</h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        The page or document you&apos;re looking for doesn&apos;t exist, or you don&apos;t have access to it.
      </p>
    </Reveal>
    <Reveal delay={0.3} className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Button asChild className="h-10 px-5">
        <Link href="/dashboard">
          <LayoutDashboard /> Go to Dashboard
        </Link>
      </Button>
      <Button asChild variant="outline" className="h-10 px-5">
        <Link href="/">
          <ArrowLeft /> Back to home
        </Link>
      </Button>
    </Reveal>
  </main>
);

export default NotFound;
