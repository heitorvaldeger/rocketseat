import { api } from "@/lib/axios";

export interface RegisterRestaurantBody {
  email: string;
  managerName: string;
  phone: string;
  restaurantName: string;
}

export const registerRestaurant = async (body: RegisterRestaurantBody) => {
  await api.post("/restaurants", body);
};
