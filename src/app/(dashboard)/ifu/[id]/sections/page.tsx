import { redirect } from "next/navigation";

const SectionsIndexPage = async ({ params }: PageProps<"/ifu/[id]/sections">) => {
  const { id } = await params;
  redirect(`/ifu/${id}/sections/device_description`);
};

export default SectionsIndexPage;
