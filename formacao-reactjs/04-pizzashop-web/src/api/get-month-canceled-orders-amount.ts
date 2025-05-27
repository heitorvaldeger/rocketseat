import { api } from "@/lib/axios";

export interface GetMonthCanceledOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}
export const getMonthCanceledOrdersAmount = async () => {
  return (
    await api.get<GetMonthCanceledOrdersAmountResponse>(
      "/metrics/month-canceled-orders-amount",
    )
  ).data;
};
