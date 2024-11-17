import { useQuery } from "@tanstack/react-query";
import LoadContent from "../components/Loader/LoadContent";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Divider, useColorScheme } from "@mui/joy";

const MyOrders = () => {
  const { user } = useAuth();
  const session = useAxiosSecure();
  const { uid, isLoading } = user || {};
  const { mode } = useColorScheme();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders", uid],
    queryFn: async () => {
      const response = await session.get("/user/orders");
      return response?.data?.data;
    },
  });

  if (ordersLoading || isLoading) return <LoadContent />;

  console.log(orders);

  return (
    <div className="max-w-screen-xl mx-auto">
      <div>
        <h1 className="text-3xl mt-2 font-semibold text-primary-teal text-center border-b-2 w-fit mx-auto px-2 py-2 border-primary-green">
          My Orders
        </h1>
        <h2 className="font-fira-sans text-center text-primary-teal mt-4">
          Here you can see all of your order details.
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
                </tr>
              </thead>

              <tbody className="text-center font-thin divide-y divide-gray-300">
                {orders.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base ">
                      <span>{new Date(item.createdAt).toLocaleString('en-IN')}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-sm">
                      {
                        item.medicines.map((product) => (
                          <div key={product._id}>
                            <span>{product.name}</span> <span className="text-gray-500 font-medium">x {product.quantity}</span>
                          </div>
                        ))
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
                      {item.totalAmount} BDT
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Divider />
          </>
        ) : (
          <h1 className="text-xl text-center font-semibold text-primary-teal mt-4">
            You have not ordered any products yet.
          </h1>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
