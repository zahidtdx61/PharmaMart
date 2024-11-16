import { Divider, useColorScheme } from "@mui/joy";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import useAuth from "../hooks/useAuth";
import { getFromLocalStorage } from "../utils";
import "./Checkout.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { user } = useAuth();
  const [checkoutData, setCheckoutData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { uid } = user || {};
  const { mode } = useColorScheme();

  useEffect(() => {
    const user_id = uid || "unregistered";
    const data = getFromLocalStorage(user_id);
    setCheckoutData(data);
    let total = 0;
    data?.forEach((item) => {
      total += parseFloat(item.pricePerUnit) * parseFloat(item.addedQuantity);
    });
    setTotalPrice(total);
  }, [uid]);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div>
        <h1 className="text-4xl font-semibold text-primary-teal text-center border-b-2 w-fit mx-auto px-2 py-2 border-primary-green">
          Checkout
        </h1>
        <h2 className="font-fira-sans text-center text-primary-teal mt-4">
          These products are added by you for checkout.
        </h2>
      </div>

      <div className="max-w-screen-xl mx-auto overflow-x-scroll lg:overflow-auto">
        {checkoutData?.length > 0 ? (
          <>
            <table className="divide-y w-full divide-gray-200 mt-6 text-lg mx-auto">
              <thead
                className={`${mode === "light" ? "bg-gray-50" : "bg-sky-950"}`}
              >
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Name
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Price Per Unit
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Quantity
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody className="text-center font-thin divide-y divide-gray-300">
                {checkoutData.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base ">
                      <span>{item.pricePerUnit}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base ">
                      <span>{item.addedQuantity}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                      {parseFloat(item?.pricePerUnit)} X{" "}
                      {parseFloat(item?.addedQuantity)} ={" "}
                      {parseFloat(item?.pricePerUnit) *
                        parseFloat(item?.addedQuantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Divider />
            <div className="flex  flex-col justify-center items-end gap-4 mt-4 pr-10">
              <h1 className="text-base">
                Total Price:{" "}
                <span className="font-semibold">{totalPrice} BDT</span>
              </h1>
            </div>

            <div className="mt-10 text-blue-400">
              <p>Please fill up necessary info in order to complete payment.</p>
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          </>
        ) : (
          <h1 className="text-xl text-center font-semibold text-primary-teal mt-4">
            No items for checkout.
          </h1>
        )}
      </div>
    </div>
  );
};

export default Checkout;
