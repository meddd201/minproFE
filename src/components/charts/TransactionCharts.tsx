"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetTransEventCharts from "@/hooks/api/transactions/useGetTransEventCharts";
import { FC, use, useEffect, useState } from "react";
import { TransactionByDate } from "@/types/charts";
import { formatStatus } from "@/utils/formatingStatus";

const chartConfig = {
  WAITING_FOR_PAYMENT: {
    label: "Waiting for Payment",
    color: "hsl(200, 70%, 50%)",
  },
  WAITING_FOR_ADMIN_CONFIRMATION: {
    label: "Waiting for Admin Confirmation",
    color: "hsl(120, 70%, 50%)",
  },
  DONE: {
    label: "Done",
    color: "hsl(90, 70%, 50%)",
  },
  REJECTED: {
    label: "Rejected",
    color: "hsl(221.2 83.2% 53.3%)",
  },
  EXPIRED: {
    label: "Expired",
    color: "hsl(0 100% 50%)",
  },
  CANCELED: {
    label: "Canceled",
    color: "hsl(0, 0%, 50%)",
  },
} satisfies ChartConfig;

interface XAxisLabel {
  month: "short" | "long" | undefined;
  day: "numeric" | undefined;
  hour: "2-digit" | undefined;
  minute: "2-digit" | undefined;
}

interface EventTransactionChartProps {
  eventId?: string | undefined;
}

const TransactionChart: FC<EventTransactionChartProps> = ({
  eventId,
}) => {
  const [timeRange, setTimeRange] = useState("1d");
  const [DataType, setDataType] = useState("Transaction");
  const [XAxisLabel, setXAxisLabel] = useState<XAxisLabel>({
    month: "short",
    day: "numeric",
    hour: undefined,
    minute: undefined,
  });
  const [dateFrom, setDateFrom] = useState<string>(
    new Date(new Date().setDate(new Date().getDate()))
      .toISOString()
      .split("T")[0],
  );

  useEffect(() => {
    setXAxisLabel({
      month: "short",
      day: "numeric",
      hour: undefined,
      minute: undefined,
    });
    if (timeRange === "1d") {
      setDateFrom(
        new Date(new Date().setDate(new Date().getDate()))
          .toISOString()
          .split("T")[0],
      );
      setXAxisLabel({
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (timeRange === "7d") {
      setDateFrom(
        new Date(new Date().setDate(new Date().getDate() - 7))
          .toISOString()
          .split("T")[0],
      );
    } else if (timeRange === "30d") {
      setDateFrom(
        new Date(new Date().setDate(new Date().getDate() - 30))
          .toISOString()
          .split("T")[0],
      );
    } else if (timeRange === "1yr") {
      setDateFrom(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1))
          .toISOString()
          .split("T")[0],
      );
    } else {
      setDateFrom("");
    }
  }, [timeRange]);

  const { data: dataToDisplay, error } = useGetTransEventCharts({
    datefrom: dateFrom,
    eventid: eventId,
  });

  const generateTotalData = () => {
    if (!dataToDisplay) return null;

    const totalData =
      DataType === "Ticket"
        ? dataToDisplay.data.totalTickets
        : dataToDisplay.data.totalTransactions;

    return Object.keys(totalData).map((key) => {
      if (key !== "date") {
        return (
          <Card
            key={key}
            className="flex grow flex-row items-center justify-between p-0 px-2"
          >
            <div className="text-xs font-medium">{formatStatus(key)}</div>
            <div className="text-muted-foreground text-sm">
              {totalData[key as keyof TransactionByDate]}
            </div>
          </Card>
        );
      }
      return null;
    });
  };

  return (
    <Card className="mb-5">
      <CardHeader className="flex flex-col items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Transaction Charts</CardTitle>
          <CardDescription>
            Showing total transactions/tickets by selected event
          </CardDescription>
        </div>
        <Select value={DataType} onValueChange={setDataType}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="Transaction" className="rounded-lg">
              Transaction
            </SelectItem>
            <SelectItem value="Ticket" className="rounded-lg">
              Ticket
            </SelectItem>
          </SelectContent>
        </Select>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="rounded-lg">
              All
            </SelectItem>
            <SelectItem value="1yr" className="rounded-lg">
              This Year
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="1d" className="rounded-lg">
              Today
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-2 pt-4 sm:flex-row sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full rounded-xl border"
        >
          <AreaChart
            data={
              DataType === "Ticket"
                ? dataToDisplay?.data.tickets
                : dataToDisplay?.data.transactions
            }
          >
            <defs>
              <linearGradient id="fillReject" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-REJECTED)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-REJECTED)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillExpired" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-EXPIRED)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-EXPIRED)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="fillWaitingForPayment"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-WAITING_FOR_PAYMENT)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-WAITING_FOR_PAYMENT)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="fillWaitingForAdminConfirmation"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-WAITING_FOR_ADMIN_CONFIRMATION)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-WAITING_FOR_ADMIN_CONFIRMATION)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDone" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-DONE)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-DONE)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCanceled" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-CANCELED)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-CANCELED)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", XAxisLabel);
              }}
            />
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString(
                      "en-US",
                      XAxisLabel,
                    );
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="EXPIRED"
              type="step"
              fill="url(#fillExpired)"
              stroke="var(--color-EXPIRED)"
              stackId="a"
            />
            <Area
              dataKey="REJECTED"
              type="step"
              fill="url(#fillReject)"
              stroke="var(--color-REJECTED)"
              stackId="a"
            />
            <Area
              dataKey="WAITING_FOR_PAYMENT"
              type="step"
              fill="url(#fillWaitingForPayment)"
              stroke="var(--color-WAITING_FOR_PAYMENT)"
              stackId="a"
            />
            <Area
              dataKey="WAITING_FOR_ADMIN_CONFIRMATION"
              type="step"
              fill="url(#fillWaitingForAdminConfirmation)"
              stroke="var(--color-WAITING_FOR_ADMIN_CONFIRMATION)"
              stackId="a"
            />
            <Area
              dataKey="DONE"
              type="step"
              fill="url(#fillDone)"
              stroke="var(--color-DONE)"
              stackId="a"
            />
            <Area
              dataKey="CANCELED"
              type="step"
              fill="url(#fillCanceled)"
              stroke="var(--color-CANCELED)"
              stackId="a"
            />
            <ChartLegend
              className="grid justify-around gap-0 sm:flex sm:gap-2"
              content={<ChartLegendContent />}
            />
          </AreaChart>
        </ChartContainer>
        <div className="grid gap-2">{generateTotalData()}</div>
      </CardContent>
    </Card>
  );
};

export default TransactionChart;
