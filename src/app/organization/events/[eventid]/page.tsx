import OrganizerEventDetailPage from "@/app/features/organization/eventDetail";

const BlogDetail = async ({
  params,
}: {
  params: Promise<{ eventid: string }>;
}) => {
  const id = (await params).eventid;
  return <OrganizerEventDetailPage eventId={id} />;
};

export default BlogDetail;
