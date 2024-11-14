import { createBrowserRouter } from "react-router-dom";
import AddMedicine from "../components/AddMedicine/AddMedicine";
import MainLayout from "../layouts/MainLayout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Registration from "../pages/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/add",
        element: <AddMedicine />,
      },
    ],
  },
]);

export default router;
