import ReactDOM from "react-dom";
import LayoutSwitcher from "./LayoutSwitcher";
import React from "react";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./types/theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <LayoutSwitcher />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
