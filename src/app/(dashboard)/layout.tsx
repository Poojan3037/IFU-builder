import { AppHeader } from "@/components/shared/AppHeader";
import { requireSession } from "@/server/services/session";

const DashboardGroupLayout = async ({ children }: LayoutProps<"/">) => {
  const { user } = await requireSession();

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <div aria-hidden className="bg-dots mask-fade-b pointer-events-none absolute inset-x-0 top-0 -z-0 h-80" />
      <AppHeader user={user} />
      <div className="relative flex flex-1 flex-col">{children}</div>
    </div>
  );
};

export default DashboardGroupLayout;
