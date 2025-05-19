import { getDetailPageEvent } from "./api/getDetailEventTicket";
import DetailComponent from "./components/detailcomponent";
import TicketSelection from "./components/ticket-selection";

interface DetailEventPageProps {
  slug: string;
}

export const DetailEventPage = async ({ slug }: DetailEventPageProps) => {
  const data = await getDetailPageEvent(slug);
  return (
    <main>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DetailComponent slug={slug} />
        </div>
          <TicketSelection event={data.data} />
      </div>
    </main>
  );
};

export default DetailEventPage;