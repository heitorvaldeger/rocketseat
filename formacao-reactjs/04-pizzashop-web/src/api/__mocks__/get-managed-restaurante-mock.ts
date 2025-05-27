import { http, HttpResponse } from "msw";
import { GetManagedRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>("/managed-restaurant", () => {
  return HttpResponse.json({
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "customer-user-id",
    managerId: "manager-user-id",
    name: "John Doe",
    description: "Customer restaurant description",
  });
});
