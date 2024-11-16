import { createBrowserRouter } from "react-router-dom";
import AddMedicine from "../components/AddMedicine/AddMedicine";
import Dashboard from "../layouts/Dashboard/Dashboard";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Cart from "../pages/Cart";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import ManageMedicines from "../pages/ManageMedicines";
import MedicineCategory from "../pages/MedicineCategory";
import MyProfile from "../pages/MyProfile";
import Registration from "../pages/Registration";
import Shop from "../pages/Shop";
import ManageUsers from "../pages/ManageUsers";

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
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/category/:id",
        element: <MedicineCategory />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <h1>Dashboard Error</h1>,
    children: [
      {
        index: true,
        element: <MyProfile />,
      },
      {
        path: "manage-medicines",
        element: <ManageMedicines />,
      },
      {
        path: "add-medicine",
        element: <AddMedicine />,
      },
      {
        path: "payment-history",
        element: <h1>Payment History</h1>,
      },
      {
        path: "advertisements",
        element: <h1>Advertisements</h1>,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      }
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
