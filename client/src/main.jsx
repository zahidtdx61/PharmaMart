import { CssBaseline, CssVarsProvider } from "@mui/joy";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <CssVarsProvider>
        <RouterProvider router={router} />
        <CssBaseline />
      </CssVarsProvider>
    </HelmetProvider>
  </React.StrictMode>
);
