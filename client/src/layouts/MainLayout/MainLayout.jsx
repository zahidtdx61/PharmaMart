import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <div className="w-full h-fit">
        <Navbar />
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
