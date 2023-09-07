import React from "react";
import ReactDOM from "react-dom/client";

import { NotificationContainer } from "react-notifications";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./config/theme";
import { MUIGlobalStyles } from "./config/theme/global";
import App from "./components/app";
import Provider from "./context";
import { GraphQLProvider } from "./providers/GraphQLProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "@1stquad/react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css";
import "react-notifications/lib/notifications.css";
import "font-awesome/css/font-awesome.min.css";
import "elegant-icons/style.css";
import "et-line/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./assets/animated.css";
import "./assets/style.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GraphQLProvider>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <MUIGlobalStyles />
          <Provider>
            <App />
            <NotificationContainer />
          </Provider>
        </LocalizationProvider>
      </ThemeProvider>
    </GraphQLProvider>
  </React.StrictMode>
);
