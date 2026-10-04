import { DEMO_DOCUMENT } from "@/features/ifu-wizard/mock-data";
import { WizardShellContainer } from "@/features/ifu-wizard/components/WizardShell.container";

const WizardLayout = async ({ children, params }: LayoutProps<"/ifu/[id]">) => {
  const { id } = await params;

  return (
    <WizardShellContainer documentId={id} deviceName={DEMO_DOCUMENT.deviceName} maxReachableIndex={3}>
      {children}
    </WizardShellContainer>
  );
};

export default WizardLayout;
