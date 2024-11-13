import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <div className="w-full h-fit">
        <Navbar />
      </div>

      <div className="min-h-svh">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
