import OrganizerEventDetailPage from "@/features/organization/eventDetail";
import OrganizerTransactionDetailPage from "@/features/organization/transaction/transaction detail";

const TransactionDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const reciptNumber = (await params).id;
  return <OrganizerTransactionDetailPage reciptNumber={reciptNumber} />;
};

export default TransactionDetail;
