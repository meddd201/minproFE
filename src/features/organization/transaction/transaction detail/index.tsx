"use client";
import { format } from "date-fns";

import {
  ArrowLeft,
  Calendar,
  Check,
  CrossIcon,
  DollarSign,
  Download,
  Eye,
  EyeClosed,
  FileText,
  Mail,
  MapPin,
  QrCode,
  Ticket,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Loading from "@/components/loading/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetOrgTransDetail from "@/hooks/api/transactions/usegetOrgTransDetail";
import { useStoreOrgBack } from "@/stores/orderOrganizerBack";
import { redirect } from "next/navigation";
import { FC, useState } from "react";
import DetailTransEvent from "./components/DetailTransEvent";
import formatRupiah from "@/utils/formatingRupiah";
import { cn } from "@/lib/utils";
import { formatStatus } from "@/utils/formatingStatus";
import ModalAcceptTransaction from "./components/ModalAccept";
import ModalRejectTransaction from "./components/ModalReject";

// This would typically come from a database or API
const transaction = {
  id: "ORD-78951354",
  date: "May 4, 2025",
  time: "13:25:55",
  totalAmount: "$245.00",
  status: "confirmed",
  event: {
    name: "Summer Music Festival 2025",
    date: "July 15-17, 2025",
    location: "Central Park, New York",
    image: "/placeholder.svg?height=120&width=240",
  },
  tickets: [
    {
      id: "TKT-001",
      type: "VIP Weekend Pass",
      quantity: 2,
      price: "$150.00",
      subtotal: "$300.00",
    },
    {
      id: "TKT-002",
      type: "Backstage Experience",
      quantity: 1,
      price: "$75.00",
      subtotal: "$75.00",
    },
  ],
  vouchers: [
    {
      id: "VCH-123",
      code: "EARLYBIRD25",
      description: "Early Bird Discount",
      amount: "-$75.00",
    },
  ],
  coupons: [
    {
      id: "CPN-456",
      code: "MEMBER10",
      description: "Member Discount",
      amount: "-$30.00",
    },
    {
      id: "CPN-789",
      code: "FREEPARKING",
      description: "Free Parking Voucher",
      amount: "-$25.00",
    },
  ],
  paymentMethod: "Visa ending in 4242",
  customer: {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
  },
  attendees: [
    {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      ticketType: "VIP Weekend Pass",
    },
    {
      name: "Jamie Smith",
      email: "jamie.smith@example.com",
      ticketType: "VIP Weekend Pass",
    },
    {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      ticketType: "Backstage Experience",
    },
  ],
};

interface TransactionDetailProps {
  reciptNumber: string;
}
export const OrganizerTransactionDetailPage: FC<TransactionDetailProps> = ({
  reciptNumber,
}) => {
  const { backref } = useStoreOrgBack();
  const { data: detail, isPending, error } = useGetOrgTransDetail(reciptNumber);
  const [openAccept, setOpenAccept] = useState(false);
  const [openReject, setOpenReject] = useState(false);

  if (isPending) {
    return <Loading className="container h-screen" />;
  }
  if (error) {
    redirect(backref);
  }

  const statuscolor = () => {
    if (detail.data.status === "DONE") {
      return "bg-green-100 text-green-800 hover:bg-green-100 ";
    } else if (
      detail.data.status === "EXPIRED" ||
      detail.data.status === "CANCELED"
    ) {
      return "bg-red-100 text-red-800 hover:bg-red-100 ";
    } else {
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 ";
    }
  };

  let priceBeforeDiscount = 0;
  detail.data.transactionTicket?.forEach((ticket) => {
    priceBeforeDiscount += ticket.price * ticket.quantity;
  });
  return (
    <div className="container mx-auto max-w-5xl px-8 py-8">
      <div className="mb-6">
        <Link
          href={backref}
          className="text-muted-foreground hover:text-foreground flex items-center text-sm transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Link>
      </div>

      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
          <p className="text-muted-foreground">
            Order #{detail.data.id} •{" "}
            {format(detail.data.createdAt, "MMMM dd, yyyy")} •{" "}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="grow">
                <CardTitle className="text-xl">Event Details</CardTitle>
                <CardDescription>
                  Ticket information and summary
                </CardDescription>
              </div>
              <div
                className={cn(
                  statuscolor(),
                  "max-w-[100px] rounded-md px-2 py-1 text-center text-sm md:max-w-none",
                )}
              >
                {formatStatus(detail.data.status)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {detail && (
              <DetailTransEvent
                transactionTickets={detail.data.transactionTicket!}
              />
            )}

            <Separator />

            <div>
              <h3 className="mb-3 font-medium">Tickets</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket Type</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detail.data.transactionTicket!.map((transTicket) => (
                    <TableRow key={transTicket.tickets!.name}>
                      <TableCell className="font-medium">
                        {transTicket.tickets?.name}
                      </TableCell>
                      <TableCell className="text-right">
                        {transTicket.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatRupiah(transTicket.price)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatRupiah(transTicket.price * transTicket.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Separator />

            <div>
              <h3 className="mb-3 font-medium">Vouchers & Coupons Applied</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>TYPE</TableHead>
                    <TableHead className="text-right">Discount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detail.data.voucherTransaction?.map((voucher) => (
                    <TableRow key={voucher.id}>
                      <TableCell className="font-medium">
                        {voucher.id}
                      </TableCell>
                      <TableCell>Event Voucher</TableCell>
                      <TableCell className="text-right text-green-600">
                        {voucher &&
                          formatRupiah(voucher.eventVoucher!.amountDiscount)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {detail.data.cuponTransactions?.map((cupon) => (
                    <TableRow key={cupon.id}>
                      <TableCell className="font-medium">{cupon.id}</TableCell>
                      <TableCell>Cupon {formatStatus(cupon.type)}</TableCell>
                      <TableCell className="text-right text-green-600">
                        {cupon.type === "PERCENTAGE"
                          ? `${cupon.amount} %`
                          : formatRupiah(cupon.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Separator />

            <div className="justify-between gap-4 sm:flex-row">
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>{formatRupiah(priceBeforeDiscount)}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">
                  Percent Discounts:
                </span>
                <span className="text-green-600">
                  {`(${detail.data.totalPercentDiscount}%) ${formatRupiah(
                    (priceBeforeDiscount * detail.data.totalPercentDiscount) /
                      100,
                  )}`}
                </span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">
                  Decrease Discounts:
                </span>
                <span className="text-green-600">
                  {formatRupiah(detail.data.totalDecreaseDiscount)}
                </span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">Points Used:</span>
                <span className="text-green-600">
                  {formatRupiah(detail.data.pointsUsed)}
                </span>
              </div>
              <div className="flex justify-between gap-8 font-bold">
                <span>Total:</span>
                <span>{formatRupiah(detail.data.totalPrice)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {detail.data.paymentProof && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Payment Proof
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 items-center justify-center space-y-4">
                <div className="flex items-center justify-center space-y-2 rounded-lg border p-3">
                  <Image
                    src={detail.data.paymentProof}
                    alt="Payment Proof"
                    width={300}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                </div>
                <Link href={detail.data.paymentProof} target="_blank">
                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4 hover:block" />
                    Detail
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              {detail.data.users?.profilePict && (
                <div className="flex items-center gap-4">
                  <Image
                    src={detail.data.users?.profilePict}
                    alt="Profile Picture"
                    width={50}
                    height={50}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-medium">{detail.data.users?.username}</p>
                <p className="text-sm">{detail.data.users?.email}</p>
              </div>
            </CardContent>
          </Card>
          {detail.data.status === "WAITING_FOR_ADMIN_CONFIRMATION" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  onClick={() => setOpenAccept(true)}
                  variant="outline"
                  className="w-full justify-start bg-green-300 hover:bg-green-500"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Accept Order
                </Button>
                <Button
                  onClick={() => setOpenReject(true)}
                  variant="outline"
                  className="w-full justify-start bg-red-300 hover:bg-red-500"
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject Order
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <ModalAcceptTransaction
        reciptNumber={reciptNumber}
        isOpen={openAccept}
        onClose={() => setOpenAccept(false)}
      />
      <ModalRejectTransaction
        reciptNumber={reciptNumber}
        isOpen={openReject}
        onClose={() => setOpenReject(false)}
      />
    </div>
  );
};

export default OrganizerTransactionDetailPage;
