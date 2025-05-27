import { http, HttpResponse } from "msw";
import { GetDailyReceiptInPeriodResponse } from "../get-daily-receipt-in-period";

interface GetDailyRevenueInPeriodQuery {
  from?: string;
  to?: string;
}
export const getDailyReceiptInPeriodMock = http.get<
  GetDailyRevenueInPeriodQuery,
  never,
  GetDailyReceiptInPeriodResponse
>("/metrics/daily-receipt-in-period", ({ params }) => {
  params.from = "2024-03-04";
  params.to = "2024-03-06";

  return HttpResponse.json([
    {
      date: "04/03/2024",
      receipt: 24,
    },
    {
      date: "05/03/2024",
      receipt: 27,
    },
    {
      date: "06/03/2024",
      receipt: 22,
    },
  ]);
});
