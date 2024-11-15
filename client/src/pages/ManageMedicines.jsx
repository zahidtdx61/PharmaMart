import { useColorScheme } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import LoadContent from "../components/Loader/LoadContent";
import ManageMedicineTable from "../components/ManageMedicineTable/ManageMedicineTable";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageMedicines = () => {
  const session = useAxiosSecure();
  const { mode } = useColorScheme();

  const { data: medicines, isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const response = await session.get("/vendor/all-medicine");
      console.log(response.data.data);
      return response.data.data;
    },
  });

  if (isLoading) return <LoadContent />;

  return (
    <div className="p-4">
      <div>
        <h1 className="text-4xl font-semibold text-primary-teal text-center border-b-2 w-fit mx-auto px-2 py-2 border-primary-green">
          Manage Your Medicines
        </h1>
        <h2 className="font-fira-sans text-center text-primary-teal mt-4">
          List of all medicines added by you. You can edit or delete any
          medicine from here.
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
                className="px-6 py-3 text-left  font-medium uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left  font-medium uppercase tracking-wider text-center"
              >
                Price Per Unit (BDT)
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left  font-medium uppercase tracking-wider"
              >
                Stock
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
              <ManageMedicineTable key={medicine._id} medicine={medicine} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMedicines;
