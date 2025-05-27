import { api } from "@/lib/axios";
import { Order } from "@/models/order";

export interface GetOrdersQuery {
  customerName?: null | string;
  orderId?: null | string;
  pageIndex?: null | number;
  status?: null | string;
}

export interface GetOrdersResponse {
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
  orders: Order[];
}

export const getOrders = async ({
  customerName,
  orderId,
  pageIndex,
  status,
}: GetOrdersQuery) => {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: {
      customerName,
      orderId,
      pageIndex,
      status,
    },
  });

  return response.data;
};
