import { api } from "@/lib/axios";

export interface GetDayOrdersAmountResponse {
  amount: number;
  diffFromYesterday: number;
}
export const getDayOrdersAmount = async () => {
  return (
    await api.get<GetDayOrdersAmountResponse>("/metrics/day-orders-amount")
  ).data;
};
