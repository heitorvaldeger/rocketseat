import { api } from "@/lib/axios";

export interface GetOrderDetailsParams {
  orderId: string;
}

export interface GetOrderDetailsResponse {
  createdAt: string;
  customer: {
    email: string;
    name: string;
    phone: null | string;
  };
  id: string;
  orderItems: {
    id: string;
    priceInCents: number;
    product: {
      name: string;
    };
    quantity: number;
  }[];
  status: "canceled" | "delivered" | "delivering" | "pending" | "processing";
  totalInCents: number;
}

export const getOrderDetails = async ({ orderId }: GetOrderDetailsParams) => {
  return (await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)).data;
};
