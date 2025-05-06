import Loading from "@/components/loading/loading";
import StepTwoIDPage from "@/features/organization/createEvent/step2";
import useGetOrgDetailEvent from "@/hooks/api/events/useGetOrgDetailEvent";
import { redirect } from "next/navigation";

const StepTwoID = async ({
  params,
}: {
  params: Promise<{ eventid: string }>;
}) => {
  const eventid = (await params).eventid;

  return <StepTwoIDPage eventid={eventid} />;
};

export default StepTwoID;
