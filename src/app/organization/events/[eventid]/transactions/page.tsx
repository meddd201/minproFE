import EventTransactionsPage from "@/features/organization/eventDetail/transactions";

const EventTransactions = async ({
  params,
}: {
  params: Promise<{ eventid: string }>;
}) => {
  const id = (await params).eventid;
  return <EventTransactionsPage eventId={id} />;
};

export default EventTransactions;
