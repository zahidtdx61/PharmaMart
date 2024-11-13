import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useNavigation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import useAuth from "../hooks/useAuth";

const Registration = () => {
  const [tab, tabIndex] = useState(0);
  const { user, isLoading } = useAuth();

  const navigation = useNavigation();

  if (navigation.state === "loading") return <Loader />;
  if (isLoading)
    return (
      <>
        <Helmet>
          <title>PharmaMart | Registration</title>
        </Helmet>
        <Loader />
      </>
    );

  if (user) {
    // toast.error("You are already signed in");
    return <Navigate to="/" />;
  }

  return (
    <section className="flex flex-col items-center justify-center font-mulish">
      <Helmet>
        <title>PharmaMart | Registration</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center w-full max-w-2xl px-10 mx-auto mb-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
        <Link
          to={"/"}
          className="text text-center  font-mulish text-primary-teal font-bold sm:text-3xl"
        >
          Join our trusted community of healthcare providers, pharmacies, and
          customers.
        </Link>
        <div className="text-center flex gap-2 font-mulish">
          <button
            onClick={() => tabIndex(0)}
            className={`${
              tab === 0 && "border-b-2 border-primary-teal text-primary-teal"
            } px-4 py-2`}
          >
            Sign In
          </button>
          <button
            onClick={() => tabIndex(1)}
            className={`${
              tab === 1 && "border-b-2 border-primary-teal text-primary-teal"
            } px-4 py-2`}
          >
            Sign Up
          </button>
        </div>

        <div>{tab === 0 ? <SignIn tabIndex={tabIndex} /> : <SignUp />}</div>
      </div>
    </section>
  );
};

export default Registration;
