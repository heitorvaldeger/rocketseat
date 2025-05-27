import { api } from "@/lib/axios";

export interface GetProfileResponse {
  createdAt: Date | null;
  email: string;
  id: string;
  name: string;
  phone: null | string;
  role: "customer" | "manager";
  updatedAt: Date | null;
}

export const getProfile = async () => {
  const response = await api.get<GetProfileResponse>("me");
  return response.data;
};
