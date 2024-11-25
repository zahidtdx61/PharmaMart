import { Divider, useColorScheme } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import LoadContent from "../components/Loader/LoadContent";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user } = useAuth();
  const session = useAxiosSecure();
  const { uid, isLoading } = user || {};
  const { mode } = useColorScheme();

  const checkBuyer = (buyer_id) => {
    return buyer_id?.uid === uid;
  };

  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ["payments", uid],
    queryFn: async () => {
      const response = await session.get("/user/payments");
      return response?.data?.data;
    },
  });

  if (paymentsLoading || isLoading) return <LoadContent />;

  console.log(payments);

  return (
    <div className="max-w-screen-xl mx-auto">
      <Helmet>
        <title>PharmaMart | Payment History</title>
      </Helmet>

      <div>
        <h1 className="text-3xl mt-2 font-semibold text-primary-teal text-center border-b-2 w-fit mx-auto px-2 py-2 border-primary-green">
          My Payment History
        </h1>
        <h2 className="font-fira-sans text-lg text-center text-primary-teal mt-4">
          Here you can see all of your payment history.
        </h2>
      </div>

      <div className="max-w-screen-lg mx-auto overflow-x-scroll lg:overflow-auto">
        {payments?.length > 0 ? (
          <>
            <table className="divide-y w-full divide-gray-200 mt-6 text-lg mx-auto">
              <thead
                className={`${mode === "light" ? "bg-gray-50" : "bg-sky-950"}`}
              >
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    SL. NO.
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Date
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Role
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Product
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Price
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Payment Approval
                  </th>
                </tr>
              </thead>

              <tbody className="text-center font-thin divide-y divide-gray-300">
                {payments.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base ">
                      <span>
                      {new Date(item?.createdAt).toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base ">
                      {checkBuyer(item.buyer_id) ? "Buyer" : "Seller"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                      <span>{item.name}</span>{" "}
                      <span className="font-medium">x {item.quantity}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                      {item.totalPrice} BDT
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base capitalize">
                      {item.status === "pending" ? (<span className="text-yellow-500">Pending</span>) : item.status === "approved" ? (<span className="text-green-500">Approved</span>) : (<span className="text-red-500">Rejected</span>)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Divider />
            <div className="my-4"></div>
          </>
        ) : (
          <h1 className="text-xl text-center font-semibold text-primary-teal my-4">
            You do not have any payment history.
          </h1>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
