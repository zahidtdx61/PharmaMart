import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadContent from "../Loader/LoadContent";

const AddMedicine = () => {
  const { register, handleSubmit } = useForm();
  const session = useAxiosSecure();
  const { user, isLoading, setIsLoading } = useAuth();
  const [manufactureDate, setManufactureDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState(null);
  const [tagError, setTagError] = useState(false);

  const { data: options, isLoading: tagsLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await session.get("/medicine/category");
      const data = response.data;
      const formattedOptions = data.data.map((item) => ({
        label: item.name,
        value: item._id,
      }));
      return formattedOptions;
    },
  });

  const submitData = async (data) => {
    setTagError(false);
    // console.log(data);
    if (selectedOption === null) {
      setTagError(true);
      return;
    }

    data.vendorId = user.uid;
    data.categoryId = selectedOption;
    data.manufactureDate = manufactureDate;
    data.expiryDate = expiryDate;
    console.log(data);
    try {
      setIsLoading(true);
      const resp = await session.post("/vendor/add-medicine", data);
      toast.success(resp.data.message);
      console.log(resp);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      toast.error("Failed to add medicine");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || tagsLoading)
    return (
      <>
        <LoadContent />
      </>
    );

  return (
    <div className="w-full mx-auto mt-4">
      <div className="w-fit mx-auto px-2 tracking-tight border-primary-green  text-center font-mulish font-semibold text-2xl text-primary-teal border-b-2">
        Add Your Medicine
      </div>

      <form
        onSubmit={handleSubmit(submitData)}
        className="space-y-5 max-w-screen-lg p-4 mx-auto"
      >
        <div>
          <label className="font-medium">Name</label>
          <input
            type="text"
            {...register("name")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Medicine Name"
          />
        </div>

        <div>
          <label className="font-medium">Image Url</label>
          <input
            type="text"
            {...register("image")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Image Url"
          />
        </div>

        <div>
          <label className="font-medium">Description</label>
          <textarea
            {...register("description")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Medicine Description"
          />
        </div>

        <div>
          <label className="font-medium">Company</label>
          <input
            type="text"
            {...register("company")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Company Name"
          />
        </div>

        <div>
          <label htmlFor="image" className="font-medium">
            Category:
          </label>
          <Select
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            defaultValue={selectedOption}
            onChange={({ value }) => setSelectedOption(value)}
            options={options}
          />
          {tagError && <p className="text-red-500">Please select a tag</p>}
        </div>

        <div>
          <label className="font-medium">Type</label>
          <input
            type="text"
            {...register("type")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Medicine Type"
          />
        </div>

        <div>
          <label className="font-medium">Price Per Unit</label>
          <input
            type="number"
            {...register("pricePerUnit")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Price Per Unit"
          />
        </div>

        <div>
          <label className="font-medium">Discount</label>
          <input
            type="number"
            {...register("discount")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Discount"
          />
        </div>

        <div>
          <label className="font-medium">Status</label>
          <input
            type="text"
            {...register("status")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Status"
          />
        </div>

        <div>
          <label className="font-medium">Quantity</label>
          <input
            type="number"
            {...register("quantity")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Quantity"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex items-center gap-2">
            <label className="font-medium">Manufacturing Date</label>
            <DatePicker
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              selected={manufactureDate}
              onChange={(date) => setManufactureDate(date)}
            />
          </div>

          <div className="flex items-center gap-2">
          <label className="font-medium">Expiry Date</label>
          <DatePicker
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            selected={expiryDate}
            onChange={(date) => setExpiryDate(date)}
          />
        </div>
        </div>

        

        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-primary-green rounded-lg shadow-md hover:bg-primary-teal focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-opacity-75"
          >
            Add Medicine
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicine;
