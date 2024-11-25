import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import LoadContent from "../components/Loader/LoadContent";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UpdateCategory = () => {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const session = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    if (data.name === category.name && data.image === category.image) {
      toast.error("No changes made");
      return;
    }

    try {
      setIsLoading(true);
      await session.put(`/admin/update-category/${id}`, data);
      toast.success("Category Updated Successfully");
      setIsLoading(false);
      navigate("/dashboard/manage-categories");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to update Category");
    }
  };

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const response = await session.get(`/medicine/get-category/${id}`);
      return response.data.data;
    },
  });

  if (isLoading || categoryLoading) return <LoadContent />;

  const { name, image } = category || {};

  return (
    <div className="max-w-screen-lg mx-auto">
      <Helmet>
        <title>PharmaMart | Update Category</title>
      </Helmet>

      <div className="mt-4">
        <h1 className="w-fit mx-auto text-2xl text-primary-teal border-b-2 border-primary-teal px-2 py-1 font-semibold text-center">
          Update Category
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
              defaultValue={name}
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
              defaultValue={image}
              className="border-2 border-gray-600 rounded-md p-2"
              placeholder="Enter Category Image URL"
            />
          </div>
          <button
            type="submit"
            className="bg-sky-600 text-zinc-50 rounded-md p-2 mt-4"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
