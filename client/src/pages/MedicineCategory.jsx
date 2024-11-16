import { useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ShopTableData from "../components/ShopTable/ShopTableData";
import { useColorScheme } from "@mui/joy";

const MedicineCategory = () => {
  const { id } = useParams();
  const { isLoading } = useAuth();
  const session = useAxiosSecure();
  const { mode } = useColorScheme();

  const { data: medicines, isLoading: medicineLoading } = useQuery({
    queryKey: ["medicine"],
    queryFn: async () => {
      const response = await session.get(`/medicine/get-by-category/${id}`);
      const data = response.data;
      return data.data;
    },
  });

  if (isLoading || medicineLoading) return <Loader />;

  console.log({ id, medicines });
  return <div>
    <div className="max-w-screen-xl mx-auto overflow-x-scroll lg:overflow-auto">
        <table className="divide-y w-full divide-gray-200 mt-6 text-lg mx-auto">
          <thead
            className={`${mode === "light" ? "bg-gray-50" : "bg-sky-950"}`}
          >
            <tr className="text-xs lg:text-base">
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
                Price Per Unit
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
            {medicines.map((medicine) => (
              <ShopTableData key={medicine._id} medicine={medicine} />
            ))}
          </tbody>
        </table>
      </div>
  </div>;
};

export default MedicineCategory;
