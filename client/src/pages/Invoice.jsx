import { Divider, useColorScheme } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import generatePDF, { Margin } from "react-to-pdf";
import LoadContent from "../components/Loader/LoadContent";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import logo from "/pharma-logo.png";

const Invoice = () => {
  const { transaction_id } = useParams();
  const session = useAxiosSecure();
  const { mode } = useColorScheme();
  const { user } = useAuth();
  // console.log(transaction_id);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["invoice", transaction_id],
    queryFn: async () => {
      const response = await session(`/payment/invoice/${transaction_id}`);
      return response?.data?.data;
    },
  });

  const targetRef = useRef();

  if (isLoading) return <LoadContent />;

  if (isError)
    return <div className="text-center mt-4">Something went wrong</div>;

  return (
    <div className="max-w-screen-xl mx-auto">
      <Helmet>
        <title>PharmaMart | Invoice</title>
      </Helmet>

      <div ref={targetRef} className="max-w-screen-xl mx-auto">
        {/* logo part */}
        <div className="flex items-center justify-center gap-2">
          <div className="size-10 flex items-center">
            <img
              src={logo}
              alt="logo"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="text-2xl font-semibold text-primary-teal flex items-center">
            Pharma<span className="text-sec-mint-green">Mart</span>
          </div>
        </div>

        <div className="text-center text-xl font-semibold border-b-2 pb-2 border-primary-teal w-fit mx-auto px-2 text-primary-green">
          Invoice
        </div>
        <div className="text-primary-green mx-auto w-fit font-medium mt-2">
          <p>
            Name :{" "}
            <span className="text-primary-teal font-normal">
              {user?.displayName}
            </span>
          </p>
          <p>
            Invoice ID :{" "}
            <span className="text-primary-teal font-normal">
              {data?.transaction_id}
            </span>
          </p>
          <p>
            Purchase Date :{" "}
            <span className="text-primary-teal font-normal">
              {new Date(data?.createdAt).toLocaleString("en-IN")}
            </span>
          </p>
        </div>

        {/* invoice table */}
        <div className="mt-4 mx-auto">
          {data?.medicines?.length > 0 ? (
            <>
              <table className="divide-y w-full divide-gray-200 mt-6 text-lg mx-auto">
                <thead
                  className={`${
                    mode === "light" ? "bg-gray-50" : "bg-sky-950"
                  }`}
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
                  {data?.medicines.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base ">
                        <span>{item.pricePerUnit}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base ">
                        <span>{item.quantity}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                        {parseFloat(item?.pricePerUnit)} X{" "}
                        {parseFloat(item?.quantity)} ={" "}
                        {parseFloat(item?.pricePerUnit) *
                          parseFloat(item?.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Divider />
              <div className="flex  flex-col justify-center items-end gap-4 my-4 pr-10">
                <h1 className="text-base mb-8">
                  Total Price:{" "}
                  <span className="font-semibold">{data?.totalAmount} BDT</span>
                </h1>
              </div>
            </>
          ) : (
            <h1 className="text-xl text-center font-semibold text-primary-teal mt-4">
              No items for added in this invoice.
            </h1>
          )}
        </div>
      </div>

      {/* download button */}
      {data?.medicines?.length > 0 && (
        <div className="text-center mt-4">
          <button
            onClick={() =>
              generatePDF(targetRef, {
                filename: `invoice_${transaction_id}.pdf`,
                page: {
                  format: "a4",
                  orientation: "portrait",
                  margin: Margin.MEDIUM,
                },
              })
            }
            className="bg-primary-teal text-white px-4 py-2 rounded-md hover:bg-primary-green"
          >
            Download Invoice
          </button>
        </div>
      )}
    </div>
  );
};

export default Invoice;
