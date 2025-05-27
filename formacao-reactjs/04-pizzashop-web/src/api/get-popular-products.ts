import { api } from "@/lib/axios";

export type GetPopularProductsResponse = {
  amount: number;
  product: string;
}[];

export const getPopularProducts = async () => {
  return (
    await api.get<GetPopularProductsResponse>("/metrics/popular-products")
  ).data;
};
