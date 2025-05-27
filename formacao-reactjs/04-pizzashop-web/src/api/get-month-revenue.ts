import { api } from "@/lib/axios";

export interface GetMonthRevenueResponse {
  diffFromLastMonth: number;
  receipt: number;
}
export const getMonthRevenue = async () => {
  return (await api.get<GetMonthRevenueResponse>("/metrics/month-receipt"))
    .data;
};
