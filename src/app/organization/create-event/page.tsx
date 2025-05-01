import { redirect } from "next/navigation";

const createEventWithoutID = () => {
  redirect("/organization/create-event/step1");
};

export default createEventWithoutID;
