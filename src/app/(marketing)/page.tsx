import { ComplianceShowcase } from "@/features/marketing/components/ComplianceShowcase";
import { CtaBand } from "@/features/marketing/components/CtaBand";
import { Faq } from "@/features/marketing/components/Faq";
import { FeatureBento } from "@/features/marketing/components/FeatureBento";
import { Hero } from "@/features/marketing/components/Hero";
import { HowItWorks } from "@/features/marketing/components/HowItWorks";
import { Personas } from "@/features/marketing/components/Personas";
import { Stats } from "@/features/marketing/components/Stats";
import { TrustStrip } from "@/features/marketing/components/TrustStrip";

const LandingPage = () => (
  <>
    <div className="pt-[76px]">
      <Hero />
    </div>
    <TrustStrip />
    <HowItWorks />
    <FeatureBento />
    <ComplianceShowcase />
    <Stats />
    <Personas />
    <Faq />
    <CtaBand />
  </>
);

export default LandingPage;
