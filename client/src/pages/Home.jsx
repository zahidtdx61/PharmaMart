import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner/Banner";

const Home = () => {
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
