import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner/Banner";
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
        <Banner />
      </div>
    </>
  );
};

export default Home;
