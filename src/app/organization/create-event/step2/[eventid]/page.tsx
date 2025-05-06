import StepTwoIDPage from "@/features/organization/createEvent/step2";

const StepTwoID = async ({
  params,
}: {
  params: Promise<{ eventid: string }>;
}) => {
  const eventid = (await params).eventid;

  return <StepTwoIDPage eventid={eventid} />;
};

export default StepTwoID;
