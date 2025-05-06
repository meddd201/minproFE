import StepOneIDPage from "@/features/organization/createEvent/step1/withid";

const StepOneID = async ({
  params,
}: {
  params: Promise<{ eventid: string }>;
}) => {
  const eventid = (await params).eventid;

  return <StepOneIDPage eventid={eventid} />;
};

export default StepOneID;
