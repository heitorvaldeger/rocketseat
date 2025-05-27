import {
  getDailyReceiptInPeriod,
  GetDailyReceiptInPeriodResponse,
} from "@/api/get-daily-receipt-in-period";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { differenceInDays, subDays } from "date-fns";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { type DateRange } from "react-day-picker";
import { useQuery } from "react-query";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import colors from "tailwindcss/colors";

export const RevenueChart = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: dailyReceiptInPeriod } = useQuery<
    GetDailyReceiptInPeriodResponse,
    any
  >({
    queryKey: ["metrics", "daily-receipt-in-period", dateRange],
    queryFn: async () =>
      await getDailyReceiptInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  });

  const chartData = useMemo(() => {
    return dailyReceiptInPeriod?.map((chartItem) => ({
      date: chartItem.date,
      receipt: chartItem.receipt / 100,
    }));
  }, [dailyReceiptInPeriod]);

  const handleDateRangeChange = (date?: DateRange) => {
    if (date) {
      if (differenceInDays(date.to!, date.from!) > 7) {
        toast.error("O intervalo das datas não pode ser superior a 7 dias.");
        return;
      }
      setDateRange(date);
    }
  };

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker
            date={dateRange}
            onDateChange={handleDateRangeChange}
          />
        </div>
      </CardHeader>

      <CardContent>
        {chartData ? (
          <ResponsiveContainer height={240} width="100%">
            <LineChart
              data={chartData}
              style={{
                fontSize: 12,
              }}
            >
              <XAxis dataKey="date" dy={16} />
              <YAxis
                stroke="#888"
                tickFormatter={(value: number) =>
                  value.toLocaleString("pt-BR", {
                    currency: "BRL",
                    style: "currency",
                  })
                }
                width={80}
              />
              <CartesianGrid className="stroke-muted" vertical={false} />

              <Line
                dataKey="receipt"
                stroke={colors.violet[500]}
                strokeWidth={2}
                type="linear"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
