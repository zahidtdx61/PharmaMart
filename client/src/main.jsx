import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <CssVarsProvider theme={theme}>
            <RouterProvider router={router} />
            <Toaster />
            <CssBaseline />
          </CssVarsProvider>
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
