import { Divider, useColorScheme } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import LoadContent from "../components/Loader/LoadContent";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const SalesReport = () => {
  const { user } = useAuth();
  const session = useAxiosSecure();
  const { uid, isLoading } = user || {};
  const { mode } = useColorScheme();

  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Sales_Report",
    sheet: "Sales_Report",
  });

  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ["payments", uid],
    queryFn: async () => {
      const response = await session.get("/admin/all-single-payments");
      return response?.data?.data;
    },
  });

  if (paymentsLoading || isLoading) return <LoadContent />;

  return (
    <div className="max-w-screen-xl mx-auto">
      <div>
        <h1 className="text-3xl mt-2 font-semibold text-primary-teal text-center border-b-2 w-fit mx-auto px-2 py-2 border-primary-green">
          My Payment History
        </h1>
        <h2 className="font-fira-sans text-lg text-center text-primary-teal mt-4">
          Here you can see payment history of all users.
        </h2>
      </div>

      <div className="max-w-screen-lg mx-auto overflow-x-scroll lg:overflow-auto">
        {payments?.length > 0 ? (
          <>
            <div className="flex justify-end">
              <button
                onClick={onDownload}
                className="bg-primary-green text-white px-4 py-2 rounded-md mt-4"
              >
                Download Sales Report as Excel
              </button>
            </div>

            <table ref={tableRef} className="divide-y w-full divide-gray-200 mt-6 text-lg mx-auto">
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
                    Product
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Buyer Email
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Vendor Email
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Price
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
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                      <span>{item.name}</span>{" "}
                      <span className="font-medium">x {item.quantity}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base ">
                      {item?.buyer_id?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base ">
                      {item?.vendor_id?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                      {item.totalPrice} BDT
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

export default SalesReport;
