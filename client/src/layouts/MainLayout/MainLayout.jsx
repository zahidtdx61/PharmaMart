import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import Navbar from "../../components/Navbar/Navbar";
import useAuth from "../../hooks/useAuth";

const MainLayout = () => {
  const { isLoading } = useAuth();
  const navigation = useNavigation();

  if (navigation.state === "loading" || isLoading) return <Loader />;

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
