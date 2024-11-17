import { Divider, useColorScheme } from "@mui/joy";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadContent from "../components/Loader/LoadContent";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRole from "../hooks/useRole";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { user } = useAuth();
  const session = useAxiosSecure();
  const { uid, isLoading } = user || {};
  const { mode } = useColorScheme();
  const { role, isRoleLoading } = useRole();

  const { data: orders, isLoading: ordersLoading, refetch } = useQuery({
    queryKey: ["orders", uid],
    queryFn: async () => {
      let url = "";
      if (role === "admin") {
        url = "/admin/all-payments";
      } else {
        url = "/user/orders";
      }
      const response = await session.get(url);
      return response?.data?.data;
    },
  });

  const {mutateAsync: makeApproval, isLoading:isApprovalLoading} = useMutation({
    mutationFn: async (id) => {
      const response = await session.put(`/admin/approve-payment/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Order Approved Successfully");
      refetch();
    },
    onError: () => {},
  })

  if (ordersLoading || isLoading || isRoleLoading || isApprovalLoading) return <LoadContent />;

  console.log(orders);

  const handleApproval = async (id) => {
    await makeApproval(id);
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <div>
        <h1 className="text-3xl mt-2 font-semibold text-primary-teal text-center border-b-2 w-fit mx-auto px-2 py-2 border-primary-green">
          {
            role === "admin" ? "All Payments" : "My Orders"
          }
        </h1>
        <h2 className="font-fira-sans text-lg text-center text-primary-teal mt-4">
          {
            role === "admin" ? "Here you can see all of the payments info." : "Here you can see all of your order details."
          }
        </h2>
      </div>

      <div className="max-w-screen-lg mx-auto overflow-x-scroll lg:overflow-auto">
        {orders?.length > 0 ? (
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
                    Purchase Date
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Products
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Price
                  </th>
                  {role === "admin" && (
                    <>
                      <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                        Buyer
                      </th>
                      <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                        Status
                      </th>
                    </>
                  )}
                </tr>
              </thead>

              <tbody className="text-center font-thin divide-y divide-gray-300">
                {orders.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base ">
                      <span>
                        {new Date(item.createdAt).toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                      {item.medicines.map((product) => (
                        <div key={product._id}>
                          <span>{product.name}</span>{" "}
                          <span className="text-gray-500 font-medium">
                            x {product.quantity}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                      {item.totalAmount} BDT
                    </td>
                    {role === "admin" && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                          <div>{item.buyer_id.name}</div>
                          <div>{item.buyer_id.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                          {item.status === "pending" ? (
                            <button onClick={() => handleApproval(item._id)} className="text-white font-semibold bg-yellow-500 px-4 py-1 rounded-lg">Pending</button>
                          ) : (
                            <button className="text-white font-semibold bg-green-500 px-4 py-1 rounded-lg">Approved</button>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            <Divider />
          </>
        ) : (
          <h1 className="text-xl text-center font-semibold text-primary-teal mt-4">
            {
              role === "admin" ? "No payment has been made yet." : "You have not ordered any products yet."
            }
          </h1>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
