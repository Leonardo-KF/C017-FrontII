import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./components/pages/home";
import { Login } from "./components/pages/login/login";
import { GlobalStyle, theme } from "./global-styles";
import { ThemeProvider } from "styled-components";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Login />
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>
);
