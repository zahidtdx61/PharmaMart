import { createBrowserRouter } from "react-router-dom";
import AddMedicine from "../components/AddMedicine/AddMedicine";
import Dashboard from "../layouts/Dashboard/Dashboard";
import MainLayout from "../layouts/MainLayout/MainLayout";
import AddCategory from "../pages/AddCategory";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Invoice from "../pages/Invoice";
import ManageCategory from "../pages/ManageCategory";
import ManageMedicines from "../pages/ManageMedicines";
import ManageUsers from "../pages/ManageUsers";
import MedicineCategory from "../pages/MedicineCategory";
import MyOrders from "../pages/MyOrders";
import MyProfile from "../pages/MyProfile";
import PaymentHistory from "../pages/PaymentHistory";
import Registration from "../pages/Registration";
import Shop from "../pages/Shop";
import UpdateCategory from "../pages/UpdateCategory";

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
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/invoice/:transaction_id",
        element: <Invoice />,
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
        element: <PaymentHistory />,
      },
      {
        path: "payment-management",
        element: <MyOrders />,
      },
      {
        path: "advertisements",
        element: <h1>Advertisements</h1>,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-categories",
        element: <ManageCategory />,
      },
      {
        path: "edit-category/:id",
        element: <UpdateCategory />,
      },
      {
        path: "add-new-category",
        element: <AddCategory />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
