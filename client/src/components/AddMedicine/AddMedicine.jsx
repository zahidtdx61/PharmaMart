import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddMedicine = () => {
  const { register, handleSubmit } = useForm();
  const session = useAxiosSecure();
  const { user } = useAuth();

  const submitData = async (data) => {
    data.vendor_id = user.uid;
    console.log(data);
    try {
      const resp = await session.post("/vendor/add-medicine", data);
      toast.success(resp.data.message);
      console.log(resp);
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to add medicine");
    }
  };

  return (
    <div className="w-full mx-auto">
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
          <label className="font-medium">Category</label>
          <input
            type="text"
            {...register("category")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Medicine Category"
          />
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
          <label className="font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Email"
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

        <div>
          <label className="font-medium">Manufacturing Date</label>
          <input
            type="date"
            {...register("manufacturingDate")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Expiry Date</label>
          <input
            type="date"
            {...register("expiryDate")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
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
