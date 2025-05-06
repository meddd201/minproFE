import StepThreePage from "@/features/organization/createEvent/step3";

const StepThreeID = async ({
  params,
}: {
  params: Promise<{ eventid: string }>;
}) => {
  const eventid = (await params).eventid;

  return <StepThreePage eventId={eventid} />;
};

export default StepThreeID;
