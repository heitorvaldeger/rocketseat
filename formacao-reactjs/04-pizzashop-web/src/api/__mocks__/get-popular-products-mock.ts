import { http, HttpResponse } from "msw";
import { GetPopularProductsResponse } from "../get-popular-products";

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>("/metrics/popular-products", () => {
  return HttpResponse.json([
    {
      amount: 20,
      product: "Pizza de Calabresa",
    },
    {
      amount: 15,
      product: "Pizza de Manjericão",
    },
    {
      amount: 10,
      product: "Pizza de Frango com Carne de Sol",
    },
    {
      amount: 30,
      product: "Pizza Portuguesa",
    },
  ]);
});
