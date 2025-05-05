import { FC } from "react";

interface OrganizerEventDetailPageProps {
  eventId: string;
}
const OrganizerEventDetailPage: FC<OrganizerEventDetailPageProps> = ({
  eventId,
}) => {
  return <div>OrganizerEventDetailPage {eventId}</div>;
};

export default OrganizerEventDetailPage;
