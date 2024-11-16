import { Divider, useColorScheme } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import LoadContent from "../components/Loader/LoadContent";
import ManageCategoryRow from "../components/ManageCategoryRow/ManageCategoryRow";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageCategory = () => {
  const session = useAxiosSecure();
  const { mode } = useColorScheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories", user.uid],
    queryFn: async () => {
      const response = await session.get("/medicine/category");
      return response.data.data;
    },
  });

  if (loadingCategories) return <LoadContent />;
  // console.log(categories);

  return (
    <div className="max-w-screen-lg mx-auto mt-4">
      <div>
        <h1 className="text-4xl font-semibold text-primary-teal text-center border-b-2 w-fit mx-auto px-2 py-2 border-primary-green">
          Manage Categories
        </h1>
        <h2 className="font-fira-sans text-center text-primary-teal mt-4">
          Here you can add new category as well as modify previous categories.
        </h2>
      </div>

      <div className="max-w-screen-lg mx-auto overflow-x-scroll lg:overflow-auto mb-4">
        <table className="divide-y w-full divide-gray-200 mt-6 text-sm lg:text-base mx-auto text-center">
          <thead
            className={`${mode === "light" ? "bg-gray-50" : "bg-sky-950"}`}
          >
            <tr>
              <th
                scope="col"
                className="px-6 py-3  font-medium uppercase tracking-wider"
              >
                S.No.
              </th>
              <th
                scope="col"
                className="px-6 py-3  font-medium uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3  font-medium uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3  font-medium uppercase tracking-wider"
              >
                Registered At
              </th>
              <th
                scope="col"
                className="px-6 py-3  font-medium uppercase tracking-wider text-center"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {categories.map((category, index) => (
              <ManageCategoryRow
                key={category._id}
                category={category}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      <div className="mb-12 flex justify-center mt-4">
        <button
          onClick={() => navigate("/dashboard/add-new-category")}
          className="px-5 py-1 bg-primary-teal text-zinc-50 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New Category
        </button>
      </div>
    </div>
  );
};

export default ManageCategory;
