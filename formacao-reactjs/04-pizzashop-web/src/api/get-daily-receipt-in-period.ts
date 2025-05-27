import { api } from "@/lib/axios";

export type GetDailyReceiptInPeriodResponse = {
  date: string;
  receipt: number;
}[];

export interface GetDailyRevenueInPeriodQuery {
  from?: Date;
  to?: Date;
}

export const getDailyReceiptInPeriod = async ({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) =>
  (
    await api.get<GetDailyReceiptInPeriodResponse>(
      "/metrics/daily-receipt-in-period",
      {
        params: {
          from,
          to,
        },
      },
    )
  ).data;
