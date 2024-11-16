import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  useColorScheme,
} from "@mui/joy";
import toast from "react-hot-toast";
import { IoLogOutOutline } from "react-icons/io5";
import { MdMenuOpen } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import LoadContent from "../Loader/LoadContent";
import logo from "/pharma-logo.png";

const Sidebar = () => {
  const vendorRoutes = [
    {
      name: "My Profile",
      path: "/dashboard",
    },
    {
      name: "Add Medicine",
      path: "/dashboard/add-medicine",
    },
    {
      name: "Manage Medicines",
      path: "/dashboard/manage-medicines",
    },
    {
      name: "Payment History",
      path: "/dashboard/payment-history",
    },
    {
      name: "Advertisements",
      path: "/dashboard/advertisements",
    },
  ];

  const adminRoutes = [
    {
      name: "Admin Profile",
      path: "/dashboard",
    },
    {
      name: "Manage Users",
      path: "/dashboard/manage-users",
    },
    {
      name: "Manage Categories",
      path: "/dashboard/manage-categories",
    },
    {
      name: "Payment Management",
      path: "/dashboard/payment-management",
    },
    {
      name: "Sales Report",
      path: "/dashboard/sales-report",
    },
    {
      name: "Manage Advertisements",
      path: "/dashboard/manage-advertisements",
    },
  ];

  const userRoutes = [
    {
      name: "User Profile",
      path: "/dashboard",
    },
    {
      name: "My Orders",
      path: "/dashboard/my-orders",
    },
    {
      name: "Payment History",
      path: "/dashboard/payment-history",
    },
  ];

  let routes = [];
  const { role, isRoleLoading } = useRole();
  if (role === "vendor") routes = vendorRoutes;
  else if (role === "admin") routes = adminRoutes;
  else if (role === "user") routes = userRoutes;

  const { mode, setMode } = useColorScheme();

  const changeTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const axiosSecure = useAxiosSecure();
  const { logOut, setIsLoading } = useAuth();
  const navigate = useNavigate();

  const navStyle = (isActive) => {
    return [
      isActive ? "text-red-600" : "text-primary-green",
      isActive
        ? `border-blue-300 px-2 font-semibold ${
            mode === "light" ? "bg-gray-200" : "bg-gray-700"
          }`
        : "font-medium px-2",
      `py-1 px-8 ${
        mode === "light" ? " hover:bg-gray-200" : " hover:bg-gray-700"
      } cursor-pointer`,
    ].join(" ");
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await logOut();
      await axiosSecure.get("/user/logout");
      console.log("Sign out successful");
      navigate("/");
      toast.success("Sign out successful");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  // console.log("Sidebar rendered");

  if (isRoleLoading) return <LoadContent />;

  return (
    <>
      <div
        className={`w-full min-h-svh h-full ${
          mode === "light" ? "bg-gray-100" : "bg-gray-900"
        } lg:flex lg:flex-col hidden lg:static`}
      >
        <div className="ml-2 flex items-center gap-2">
          <Link to="/" className="flex items-center mt-2 gap-2">
            <div className="size-10">
              <img
                src={logo}
                alt="logo"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="text-4xl font-semibold text-primary-teal">
              Pharma<span className="text-sec-mint-green">Mart</span>
            </div>
          </Link>
        </div>

        {/* theme switcher */}
        <div onClick={changeTheme} className="mx-auto  text-primary-teal mt-4">
          {mode === "light" ? (
            <button className="px-3 py-1 mx-auto border-2 rounded-md border-primary-teal hover:opacity-70">
              Enable Dark Mode
            </button>
          ) : (
            <button className="px-3 py-1 mx-auto border-2 rounded-md border-primary-teal hover:opacity-70">
              Enable Light Mode
            </button>
          )}
        </div>

        <div className="font-mulish font-medium flex flex-col flex-1 mt-8">
          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              end
              className={({ isActive }) => navStyle(isActive)}
            >
              {route.name}
            </NavLink>
          ))}
        </div>

        <div className="mb-4">
          <button
            className="text-lg font-bold text-center text-zinc-500 flex gap-1 items-center w-full py-2 px-3 hover:bg-zinc-300 cursor-pointer"
            onClick={handleSignOut}
          >
            <IoLogOutOutline size={20} />
            <p>Logout</p>
          </button>
          <h1 className="text-lg font-bold px-3 text-gray-500 mt-4">
            Contact us.
          </h1>
          <p className="text-center text-gray-400 px-2">
            &copy; 2024 PharmaMart. All rights reserved.
          </p>
        </div>
      </div>

      {/* for small devices */}
      <div className="lg:hidden">
        <AccordionGroup disableDivider sx={{ width: "100%" }}>
          <Accordion>
            <AccordionSummary indicator={<MdMenuOpen size={30} />}>
              <div className="ml-2 flex items-center gap-2">
                <Link to="/" className="flex items-center mt-2 gap-2">
                  <div className="size-10">
                    <img
                      src={logo}
                      alt="logo"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="text-4xl font-semibold text-primary-teal">
                    Pharma<span className="text-sec-mint-green">Mart</span>
                  </div>
                </Link>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {/* theme switcher */}
              <div
                onClick={changeTheme}
                className="mx-auto  text-primary-teal mt-4"
              >
                {mode === "light" ? (
                  <button className="px-3 py-1 mx-auto border-2 rounded-md border-primary-teal hover:opacity-70">
                    Enable Dark Mode
                  </button>
                ) : (
                  <button className="px-3 py-1 mx-auto border-2 rounded-md border-primary-teal hover:opacity-70">
                    Enable Light Mode
                  </button>
                )}
              </div>

              <div className="font-mulish font-medium flex flex-col flex-1 mt-4">
                {routes.map((route) => (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    end
                    className={({ isActive }) => navStyle(isActive)}
                  >
                    {route.name}
                  </NavLink>
                ))}

                <button
                  className="text-lg font-bold text-center text-zinc-500 flex gap-1 ml-4 items-center w-full py-2 px-3 hover:bg-zinc-300 cursor-pointer"
                  onClick={handleSignOut}
                >
                  <IoLogOutOutline size={20} />
                  <p>Logout</p>
                </button>
              </div>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </div>
    </>
  );
};

export default Sidebar;
