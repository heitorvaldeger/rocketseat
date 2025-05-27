import { http, HttpResponse } from "msw";
import { GetProfileResponse } from "../get-profile";

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  "/me",
  () => {
    return HttpResponse.json({
      createdAt: new Date(),
      updatedAt: new Date(),
      email: "johndoe@mail.com",
      id: "customer-user-id",
      name: "John Doe",
      phone: "11999999999",
      role: "manager",
    });
  },
);
