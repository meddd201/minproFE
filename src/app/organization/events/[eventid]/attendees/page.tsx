import AttendeesPage from "@/features/organization/eventDetail/attendees";

const Attendees = async ({
  params,
}: {
  params: Promise<{ eventid: string }>;
}) => {
  const id = (await params).eventid;
  return <AttendeesPage eventId={id} />;
};

export default Attendees;
