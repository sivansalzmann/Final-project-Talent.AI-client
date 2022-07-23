import ReactDOM from "react-dom";
import LayoutSwitcher from "./LayoutSwitcher";
import React from "react";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./types/theme";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <LayoutSwitcher />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
