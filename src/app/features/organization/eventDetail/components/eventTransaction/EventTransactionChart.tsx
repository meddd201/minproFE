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
import { FC, useEffect, useState } from "react";

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
  eventId: string;
}
const EventTransactionChart: FC<EventTransactionChartProps> = ({ eventId }) => {
  const [timeRange, setTimeRange] = useState("1d");
  const [XAxisLabel, setXAxisLabel] = useState<XAxisLabel>({
    month: "short",
    day: "numeric",
    hour: undefined,
    minute: undefined,
  });
  const [dateFrom, setDateFrom] = useState(new Date().toISOString());

  useEffect(() => {
    setXAxisLabel({
      month: "short",
      day: "numeric",
      hour: undefined,
      minute: undefined,
    });
    if (timeRange === "1d") {
      setXAxisLabel({
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setDateFrom(new Date(new Date().setDate(dateFrom.getDate() - 1)));
      
    } else if (timeRange === "7d") {
      setDateFrom(new Date(new Date().setDate(dateFrom.getDate() - 7)));
    } else if (timeRange === "30d") {
      setDateFrom(new Date(new Date().setDate(dateFrom.getDate() - 30)));
    } else {
      const deteToForm = "";
    }
  }, [timeRange]);

  const { data: dataToDisplay, error } = useGetTransEventCharts(eventId, {
    datefrom: "",
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
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
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={dataToDisplay?.data.transactions}>
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
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
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
              type="natural"
              fill="url(#fillExpired)"
              stroke="var(--color-EXPIRED)"
              stackId="a"
            />
            <Area
              dataKey="REJECTED"
              type="natural"
              fill="url(#fillReject)"
              stroke="var(--color-REJECTED)"
              stackId="a"
            />
            <Area
              dataKey="WAITING_FOR_PAYMENT"
              type="natural"
              fill="url(#fillWaitingForPayment)"
              stroke="var(--color-WAITING_FOR_PAYMENT)"
              stackId="a"
            />
            <Area
              dataKey="WAITING_FOR_ADMIN_CONFIRMATION"
              type="natural"
              fill="url(#fillWaitingForAdminConfirmation)"
              stroke="var(--color-WAITING_FOR_ADMIN_CONFIRMATION)"
              stackId="a"
            />
            <Area
              dataKey="DONE"
              type="natural"
              fill="url(#fillDone)"
              stroke="var(--color-DONE)"
              stackId="a"
            />
            <Area
              dataKey="CANCELED"
              type="natural"
              fill="url(#fillCanceled)"
              stroke="var(--color-CANCELED)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EventTransactionChart;
