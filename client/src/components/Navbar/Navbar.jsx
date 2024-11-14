import { Divider, useColorScheme } from "@mui/joy";
import { CgHeart, CgProfile, CgShoppingCart } from "react-icons/cg";
import { CiLight } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMoonOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader/Loader";
import UserInfo from "../UserInfo/UserInfo";
import SearchBar from "./SearchBar";
import logo from "/pharma-logo.png";

const Navbar = () => {
  const { mode, setMode } = useColorScheme();
  const { user, isLoading } = useAuth();

  const changeTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const routes = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Cart Items", path: "cart-items" },
    { name: "Contact Us", path: "/contact" },
    { name: "About Us", path: "/about" },
  ];

  if (isLoading) return <Loader />;
  const { photoURL, displayName } = user || {};
  console.log({
    photoURL,
    displayName,
  });

  return (
    <div
      className={
        mode === "light" ? "bg-white shadow-md" : "bg-slate-900 shadow-md"
      }
    >
      <div className="p-4 mb-4 flex items-center justify-between gap-24">
        {/* logo part */}
        <div className="flex items-center gap-2">
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
        </div>

        <div className="flex justify-end items-center gap-8  flex-1 w-full lg:w-[70%]">
          {/* need help */}
          <div className="text-primary-teal w-[20%] text-center">
            Need help? <span className="font-semibold">0020 500</span>
          </div>

          {/* search-bar */}
          <div className="w-[40%]">
            <SearchBar />
          </div>

          {/* icons */}
          <div className="w-[20%] flex items-center justify-end gap-4 text-primary-teal">
            <button>
              <CgHeart size={35} />
            </button>
            <button>
              <CgShoppingCart size={35} />
            </button>
            <button>
              {user ? (
                <UserInfo />
              ) : (
                <Link to="/registration">
                  <CgProfile size={30} />
                </Link>
              )}
            </button>
          </div>

          {/* theme switcher */}
          <div
            onClick={changeTheme}
            className="w-[10%] flex items-center justify-end text-primary-teal"
          >
            {mode === "light" ? (
              <button>
                <CiLight size={30} />
              </button>
            ) : (
              <button>
                <IoMoonOutline size={30} />
              </button>
            )}
          </div>
        </div>
      </div>

      <Divider />

      <div className="px-4 my-4 pb-4 flex items-center gap-6 text-lg text-primary-teal">
        <button>
          <GiHamburgerMenu size={30} />
        </button>
        <>
          {routes.map((route, index) => {
            return (
              <NavLink key={index} to={route.path}>
                {route.name}
              </NavLink>
            );
          })}
        </>
      </div>
    </div>
  );
};

export default Navbar;
