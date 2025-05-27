import { http, HttpResponse } from "msw";
import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from "../get-order-details";
import { statuses } from "./get-orders-mock";

type OrderItems = GetOrderDetailsResponse["orderItems"];
const orderItems: OrderItems = Array.from({ length: 3 }).map((_, i) => {
  return {
    id: `order-item-${i + 1}`,
    priceInCents: 2400,
    product: {
      name: `Product ${i + 1}`,
    },
    quantity: 2,
  };
});

const orders: GetOrderDetailsResponse[] = Array.from({ length: 50 }).map(
  (_, i) => {
    return {
      createdAt: new Date().toISOString(),
      customer: {
        email: `customer-${i + 1}@mail.com`,
        name: `Customer ${i + 1}`,
        phone: "119999999",
      },
      id: `order-${i + 1}`,
      orderItems: orderItems,
      status: statuses[i % 5],
      totalInCents: 14400,
    };
  },
);

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>("/orders/:orderId", ({ params }) => {
  const orderDetailsByOrderId = orders.find(
    (order) => order.id === params.orderId,
  );

  if (orderDetailsByOrderId) {
    return HttpResponse.json(orderDetailsByOrderId);
  }

  return new HttpResponse(null, {
    status: 404,
  });
});
