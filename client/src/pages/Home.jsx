import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner/Banner";
import CategorySection from "../components/CategorySection/CategorySection";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { isLoading } = useAuth();
  if (isLoading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>PharmaMart | Home</title>
      </Helmet>
      <div>
        {/* banner */}
        <div className="h-fit w-fit mx-auto static">
          <Banner />
        </div>

        <div className="mt-[100px]">
          <CategorySection />
        </div>
      </div>
    </>
  );
};

export default Home;
