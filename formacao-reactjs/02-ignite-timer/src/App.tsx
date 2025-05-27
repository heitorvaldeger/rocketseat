import { GlobalStyle } from "@/assets/styles/global";
import { defaultTheme } from "@/assets/styles/theme/default";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Router } from "./Router";
import { CyclesProvider } from "./contexts/CyclesContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CyclesProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}
