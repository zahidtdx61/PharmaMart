import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import "./index.css";
import router from "./routes/Router.jsx";

// Extend the theme
const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: "#081229", // Custom background color for dark mode
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <CssVarsProvider theme={theme}>
          <RouterProvider router={router} />
          <CssBaseline />
        </CssVarsProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
