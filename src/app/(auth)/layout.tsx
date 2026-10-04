import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { AuthBrandPanel } from "@/features/auth/components/AuthBrandPanel";

const AuthLayout = ({ children }: LayoutProps<"/">) => (
  <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
    <AuthBrandPanel />
    <main className="relative isolate flex flex-col">
      <div aria-hidden className="bg-dots mask-radial pointer-events-none absolute inset-0 -z-10" />
      <div className="flex items-center justify-between p-4 sm:p-6 lg:justify-end">
        <Logo className="lg:hidden" />
        <ThemeToggle />
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pb-12 sm:px-6">{children}</div>
    </main>
  </div>
);

export default AuthLayout;
