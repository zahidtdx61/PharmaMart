import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { getFromLocalStorage, removeFromLocalStorage } from "../../utils";
import "./CheckoutForm.css";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const price = 400;
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  const { uid } = user || {};
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // fetch client secret
    getClientSecret();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const medicineData = getFromLocalStorage(uid);
    let total = 0;
    medicineData?.forEach((item) => {
      total += parseFloat(item.pricePerUnit) * parseFloat(item.addedQuantity);
    });
    setTotalAmount(total);
  }, [uid]);

  //   get clientSecret
  const getClientSecret = async () => {
    const { data } = await axiosSecure.post(
      `/payment/create-checkout-session`,
      { price }
    );
    console.log("clientSecret from server--->", data);
    setClientSecret(data?.data?.clientSecret);
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    // confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    const medicineData = getFromLocalStorage(uid);
    let medicines = [];

    medicineData?.forEach((item) => {
      const { name, pricePerUnit, addedQuantity, _id, vendor_id } = item;
      medicines.push({
        name,
        id: _id,
        vendor_id,
        pricePerUnit: parseFloat(pricePerUnit),
        quantity: parseFloat(addedQuantity),
      });
    });

    if (paymentIntent.status === "succeeded") {
      // console.log("payment---> ", paymentIntent);
      const paymentInfo = {
        transaction_id: paymentIntent.id,
        uid: user?.uid,
        totalAmount,
        medicines,
      };
      // console.log(paymentInfo);

      try {
        await axiosSecure.post("/payment/complete-payment", paymentInfo);
        // console.log(response.data);

        toast.success("Payment Successfully");
        navigate(`/invoice/${paymentIntent.id}`);
      } catch (err) {
        console.log(err);
        toast.error("Payment Failed");
        navigate("/");
      } finally {
        removeFromLocalStorage(uid);
        setProcessing(false);
      }
    }
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <div className="max-w-screen-md mx-auto">
          <CardElement
            className="border border-gray-300 p-2 rounded-md mt-2 mx-auto"
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  margin: "auto",
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />

          <div className="flex mt-2 justify-around">
            <button
              disabled={!stripe || !clientSecret || processing}
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
            >
              {processing ? (
                <ImSpinner9 className="animate-spin m-auto" size={24} />
              ) : (
                `Pay ${totalAmount} BDT`
              )}
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
