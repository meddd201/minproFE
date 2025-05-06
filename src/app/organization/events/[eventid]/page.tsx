import OrganizerEventDetailPage from "@/features/organization/eventDetail";

const OrganizerEventDetail = async ({
  params,
}: {
  params: Promise<{ eventid: string }>;
}) => {
  const id = (await params).eventid;
  return <OrganizerEventDetailPage eventId={id} />;
};

export default OrganizerEventDetail;
