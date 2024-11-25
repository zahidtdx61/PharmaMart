import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadContent from "../components/Loader/LoadContent";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AddCategory = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const session = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      await session.post("/medicine/add-category", data);
      toast.success("Category Added Successfully");
      setIsLoading(false);
      navigate("/dashboard/manage-categories");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to add Category");
    }
  };

  if (isLoading) return <LoadContent />;

  return (
    <div className="max-w-screen-lg mx-auto">
      <Helmet>
        <title>PharmaMart | Add Category</title>
      </Helmet>
      <div className="mt-4">
        <h1 className="w-fit mx-auto text-2xl text-primary-teal border-b-2 border-primary-teal px-2 py-1 font-semibold text-center">
          Add a new Category
        </h1>

        <form
          className="flex text-base flex-col items-center mt-8"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="flex flex-col w-full md:w-1/2 mb-2">
            <label htmlFor="name" className="text-lg font-semibold mb-1">
              Category Name
            </label>
            <input
              type="text"
              required={true}
              {...register("name")}
              className="border-2 border-gray-600 rounded-md p-2"
              placeholder="Enter Category Name"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 mb-2">
            <label htmlFor="image" className="text-lg font-semibold mb-1">
              Category Image
            </label>
            <input
              type="text"
              required={true}
              {...register("image")}
              className="border-2 border-gray-600 rounded-md p-2"
              placeholder="Enter Category Image URL"
            />
          </div>
          <button
            type="submit"
            className="bg-sky-600 text-zinc-50 rounded-md p-2 mt-4"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
