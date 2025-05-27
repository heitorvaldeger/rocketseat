import { QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";

import { ThemeProvider } from "./components/theme/theme-provider";
import { queryClient } from "./lib/react-query";
import { router } from "./routes";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="@pizzashop-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
};
