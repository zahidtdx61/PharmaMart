import { useColorScheme } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader/Loader";
import ShopTableData from "../components/ShopTable/ShopTableData";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Shop = () => {
  const session = useAxiosSecure();
  const { isLoading } = useAuth();
  const { mode } = useColorScheme();

  const { data, isLoading: medicineLoading } = useQuery({
    queryKey: ["medicine"],
    queryFn: async () => {
      const response = await session.get("/medicine/get-all");
      const data = response.data;
      return data.data;
    },
  });

  if (isLoading || medicineLoading) return <Loader />;

  // console.log(data);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div>
        <h1 className="text-3xl font-semibold text-primary-teal text-center border-b-2 w-fit mx-auto px-2 py-2 border-primary-green">
          Shop
        </h1>
        <h2 className="font-fira-sans text-center text-primary-teal mt-4">
          List of our all medicines. Choose your medicines according to your
          need.
        </h2>
      </div>

      <div className="max-w-screen-xl mx-auto overflow-x-scroll lg:overflow-auto">
        <table className="divide-y w-full divide-gray-200 mt-6 text-lg mx-auto">
          <thead
            className={`${mode === "light" ? "bg-gray-50" : "bg-sky-950"}`}
          >
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left  font-medium uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center  font-medium uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center  font-medium uppercase tracking-wider"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left  font-medium uppercase tracking-wider"
              >
                Company
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left  font-medium uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left  font-medium uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((medicine) => (
              <ShopTableData key={medicine._id} medicine={medicine} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shop;
