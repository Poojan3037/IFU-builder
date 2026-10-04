import { MarketingFooter } from "@/features/marketing/components/MarketingFooter";
import { MarketingNavbar } from "@/features/marketing/components/MarketingNavbar";

const MarketingLayout = ({ children }: LayoutProps<"/">) => (
  <div className="relative flex min-h-dvh flex-col">
    <MarketingNavbar />
    <main id="main" className="-mt-[76px] flex-1">
      {children}
    </main>
    <MarketingFooter />
  </div>
);

export default MarketingLayout;
