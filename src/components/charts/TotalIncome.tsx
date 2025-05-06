import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetIncome from "@/hooks/api/transactions/useGetIncome";
import { cn } from "@/lib/utils";
import formatRupiah from "@/utils/formatingRupiah";
import { FC } from "react";

interface TotalIncomeProps {
  eventId: string | undefined;
  className?: string;
}
const TotalIncome: FC<TotalIncomeProps> = ({ eventId, className }) => {
  const { data } = useGetIncome({
    eventid: eventId,
  });
  if (!data) {
    return null;
  }
  return (
    <div className={cn("flex w-full flex-col sm:flex-row gap-2", className)}>
      <Card className="w-full text-center">
        <CardHeader>
          <CardTitle>Total Income</CardTitle>
          <CardContent>{formatRupiah(data.data.totalIncome)}</CardContent>
        </CardHeader>
      </Card>
      <Card className="w-full text-center">
        <CardHeader>
          <CardTitle>Total Income Before Discount</CardTitle>
          <CardContent>
            {formatRupiah(data.data.totalIncomeBeforeDiscount)}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default TotalIncome;
