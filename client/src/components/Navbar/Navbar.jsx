import { useColorScheme } from "@mui/joy";
import { CgHeart, CgProfile, CgShoppingCart } from "react-icons/cg";
import { CiLight } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import SearchBar from "./SearchBar";
import logo from "/pharma-logo.png";

const Navbar = () => {
  const { mode, setMode } = useColorScheme();

  const changeTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <div
      className={
        mode === "light" ? "bg-white shadow-xl" : "bg-slate-900 shadow-md"
      }
    >
      <div className="p-4 flex items-center justify-between gap-24">
        {/* logo part */}
        <div className="flex items-center gap-2">
          <div className="size-10">
            <img
              src={logo}
              alt="logo"
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="text-5xl font-semibold text-primary-teal">
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
          <div className="w-[20%] flex items-center justify-end gap-4">
            <button>
              <CgProfile size={30} />
            </button>
            <button>
              <CgHeart size={30} />
            </button>
            <button>
              <CgShoppingCart size={30} />
            </button>
          </div>

          {/* theme switcher */}
          <div
            onClick={changeTheme}
            className="w-[10%] flex items-center justify-end"
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
    </div>
  );
};

export default Navbar;
