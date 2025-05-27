import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./assets/styles/themes/default";
import { GlobalStyles } from "./assets/styles/global";
import { Router } from "./Router";
import { GithubMarkdownStyle } from "./assets/styles/github-markdown";
import { IssueProvider } from "./contexts/IssueContext";
import { UserProvider } from "./contexts/UserContext";

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <IssueProvider>
        <UserProvider>
          <Router />
          <GithubMarkdownStyle />
          <GlobalStyles />
        </UserProvider>
      </IssueProvider>
    </ThemeProvider>
  );
};
