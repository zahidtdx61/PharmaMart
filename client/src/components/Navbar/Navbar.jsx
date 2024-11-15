import {
  Divider,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  useColorScheme,
} from "@mui/joy";
import { CgHeart, CgProfile, CgShoppingCart } from "react-icons/cg";
import { CiLight } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMoonOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import UserInfo from "../UserInfo/UserInfo";
import SearchBar from "./SearchBar";
import logo from "/pharma-logo.png";

const Navbar = () => {
  const { mode, setMode } = useColorScheme();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const changeTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const routes = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Cart Items", path: "cart" },
    { name: "Contact Us", path: "/contact" },
    { name: "About Us", path: "/about" },
  ];

  const { photoURL, displayName } = user || {};

  return (
    <div
      className={
        mode === "light"
          ? "bg-white shadow-md"
          : "bg-slate-900 shadow-md"
      }
    >
      <div className="mb-4 pt-1 flex items-center justify-between">
        {/* logo part */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 p-2">
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

        {/* icons */}
        <div className="hidden lg:flex justify-end items-center gap-8  flex-1 w-full lg:w-[70%]">
          {/* need help */}
          <div className="text-primary-teal w-[15%] text-center hidden lg:flex gap-1">
            Need help? <span className="font-semibold">0020 500</span>
          </div>

          {/* search-bar */}
          <div className="w-[37%] hidden lg:flex">
            <SearchBar />
          </div>

          {/* icons */}
          <div className="w-[18%] hidden lg:flex items-center justify-end gap-4 text-primary-teal">
            <button>
              <CgHeart size={35} />
            </button>
            <button onClick={() => navigate("/cart")}>
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

          {/* theme switcher large device */}
          <div
            onClick={changeTheme}
            className="w-[10%] flex  items-center justify-end text-primary-teal pr-2"
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

        {/* theme switcher mobile device */}
        <div
            onClick={changeTheme}
            className="flex-1  static lg:hidden flex items-center justify-end text-primary-teal pr-1"
          >
            {mode === "light" ? (
              <button className="w-fit">
                <CiLight size={30} />
              </button>
            ) : (
              <button className="w-fit">
                <IoMoonOutline size={30} />
              </button>
            )}
          </div>
      </div>

      <Divider />

      <div className="px-4 my-4 pb-4 flex items-center gap-6 text-lg text-primary-teal">
        <Dropdown>
          <MenuButton>
            <GiHamburgerMenu color="#00A19D" size={30} />
          </MenuButton>
          <Menu>
            {routes.map((route, index) => {
              return (
                <MenuItem key={index}>
                  <NavLink to={route.path}>{route.name}</NavLink>
                </MenuItem>
              );
            })}
          </Menu>
        </Dropdown>

        <div className="hidden lg:flex gap-3">
          {routes.map((route, index) => {
            return (
              <NavLink key={index} to={route.path}>
                {route.name}
              </NavLink>
            );
          })}
        </div>

        {user === null ? (
          <div className="flex gap-3 flex-1 justify-end">
            <button className="px-5 py-1 bg-primary-teal text-white rounded-md">
              <Link to="/registration">Join Us</Link>
            </button>
          </div>
        ) : (
          <div className="lg:hidden flex-1">
            <UserInfo />
          </div>
        )}
      </div>

      <div className="flex lg:hidden flex-col justify-center items-center gap-2 pb-2">
        {/* need help */}
        <div className="text-primary-teal text-center">
          Need help? <span className="font-semibold">0020 500</span>
        </div>

        {/* search-bar */}
        <div className="">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
