import { getPopularProducts } from "@/api/get-popular-products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Loader2 } from "lucide-react";
import { useQuery } from "react-query";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import colors from "tailwindcss/colors";

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
];

export interface PieLabel {
  cx: number;
  cy: number;
  index: number;
  innerRadius: number;
  midAngle: number;
  outerRadius: number;
  value: number;
}
export const PopularProductsChart = () => {
  const { data: popularProducts } = useQuery({
    queryFn: getPopularProducts,
    queryKey: ["metrics", "popular-products"],
  });

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Produtos</CardTitle>
          <BarChart className="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>

      <CardContent>
        {popularProducts ? (
          <ResponsiveContainer height={240} width="100%">
            <PieChart
              style={{
                fontSize: 12,
              }}
            >
              <Pie
                cx="50%"
                cy="50%"
                data={popularProducts}
                dataKey="amount"
                innerRadius={64}
                label={({
                  cx,
                  cy,
                  index,
                  innerRadius,
                  midAngle,
                  outerRadius,
                  value,
                }: PieLabel) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 12 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      className="fill-muted-foreground text-xs"
                      dominantBaseline="central"
                      textAnchor={x > cx ? "start" : "end"}
                      x={x}
                      y={y}
                    >
                      {popularProducts[index].product.length > 12
                        ? popularProducts[index].product
                            .substring(0, 12)
                            .concat("...")
                        : popularProducts[index].product}{" "}
                      ({value})
                    </text>
                  );
                }}
                labelLine={false}
                nameKey="product"
                outerRadius={86}
                strokeWidth={4}
              >
                {popularProducts.map((_, index) => (
                  <Cell
                    className="stroke-background hover:opacity-80"
                    fill={COLORS[index]}
                    key={`cell-${index}`}
                  />
                ))}
              </Pie>
            </PieChart>
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
