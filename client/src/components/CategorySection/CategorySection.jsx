import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadContent from "../Loader/LoadContent";
import CategoryCard from "./CategoryCard";

const CategorySection = () => {
  const session = useAxiosSecure();

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await session.get("/medicine/category");
      const data = response.data;
      console.log(data.data);
      return data.data;
    },
  });

  if (categoriesLoading) return <LoadContent />;

  return (
    <div className="max-w-screen-lg mx-auto ">
      <div className="text-3xl text-center font-semibold text-primary-teal border-b-2 border-primary-green px-2 py-1 w-fit mx-auto">
        All Available Categories
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 max-w-screen-lg mx-auto p-2 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
