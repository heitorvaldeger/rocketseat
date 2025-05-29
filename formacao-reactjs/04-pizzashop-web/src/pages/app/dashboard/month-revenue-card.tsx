import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { useQuery } from "react-query";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export const MonthRevenueCard = () => {
  const { data: monthRevenue } = useQuery({
    queryFn: getMonthRevenue,
    queryKey: ["metrics", "month-revenue"],
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">
          Receita Total (mês)
        </CardTitle>
        <DollarSign className="text-muted-foreground h-6 w-6" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthRevenue ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenue.receipt / 100).toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
              })}
            </span>
            <p className="text-muted-foreground text-sm">
              {monthRevenue.diffFromLastMonth >= 0 ? (
                <span className="text-emerald-500 dark:text-emerald-400">
                  +{monthRevenue.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-rose-400">
                  {monthRevenue.diffFromLastMonth}%
                </span>
              )}{" "}
              em relação ao mês passado
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
};
