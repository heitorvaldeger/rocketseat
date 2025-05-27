import { api } from "@/lib/axios";

export interface GetMonthOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}
export const getMonthOrdersAmount = async () => {
  return (
    await api.get<GetMonthOrdersAmountResponse>("/metrics/month-orders-amount")
  ).data;
};
