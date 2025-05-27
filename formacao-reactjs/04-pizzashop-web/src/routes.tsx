import { createBrowserRouter } from "react-router";

import { NotFound } from "./pages/404";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { Orders } from "./pages/app/orders/orders";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import { Error } from "./pages/error";

export const routesConfig = [
  {
    children: [
      {
        element: <Dashboard />,
        path: "/",
      },
      {
        element: <Orders />,
        path: "/orders",
      },
    ],
    errorElement: <Error />,
    element: <AppLayout />,
    path: "/",
  },
  {
    children: [
      {
        element: <SignIn />,
        path: "/sign-in",
      },
      {
        element: <SignUp />,
        path: "/sign-up",
      },
    ],
    errorElement: <Error />,
    element: <AuthLayout />,
    path: "/",
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routesConfig);
