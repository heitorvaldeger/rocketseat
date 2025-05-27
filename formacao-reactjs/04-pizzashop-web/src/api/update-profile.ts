import { api } from "@/lib/axios";

export interface UpdateProfileBody {
  description: null | string;
  name: string;
}
export const updateProfile = async (body: UpdateProfileBody) => {
  await api.put("/profile", body);
};
