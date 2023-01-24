import React from "react";
import ReactDOM from "react-dom/client";
import { Login } from "./components/pages/login/login";
import { GlobalStyle, theme } from "./global-styles";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Classroom } from "./components/pages/classroom/classroom";
import { CreateUser } from "./components/pages/create-user/create-user";
import { ClassroomPage } from "./components/pages/classroom-page/classroom-page";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/classroom" element={<Classroom />} />
        <Route path="/register" element={<CreateUser />} />
        <Route path="/classroom/:id" element={<ClassroomPage />} />
      </Routes>
    </BrowserRouter>
    <GlobalStyle />
  </ThemeProvider>
  // </React.StrictMode>
);
