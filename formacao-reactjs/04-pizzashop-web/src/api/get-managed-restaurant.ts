import { api } from "@/lib/axios";

export interface GetManagedRestaurantResponse {
  createdAt: Date | null;
  description: null | string;
  id: string;
  managerId: null | string;
  name: string;
  updatedAt: Date | null;
}

export const getManagedRestaurant = async () => {
  const response =
    await api.get<GetManagedRestaurantResponse>("managed-restaurant");
  return response.data;
};
