import { SectionsStoreProvider } from "@/features/sections/components/SectionsStore.context";
import { SectionsWorkspaceContainer } from "@/features/sections/components/SectionsWorkspace.container";

/** Keeps the top bar, section nav and mock content alive while moving between sections. */
const SectionsLayout = ({ children }: LayoutProps<"/ifu/[id]/sections">) => (
  <SectionsStoreProvider>
    <SectionsWorkspaceContainer>{children}</SectionsWorkspaceContainer>
  </SectionsStoreProvider>
);

export default SectionsLayout;
