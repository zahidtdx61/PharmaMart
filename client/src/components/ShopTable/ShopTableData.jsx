import { useState } from "react";
import toast from "react-hot-toast";
import { BiCart } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import { saveToLocalStorage } from "../../utils";
import DetailsModal from "./DetailsModal";

const ShopTableData = ({ medicine }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { user } = useAuth();
  const { uid } = user || {};
  // console.log({ uid });

  const addItemToCart = (item) => {
    const user_id = uid || "unregistered";
    saveToLocalStorage(user_id, item);
    toast.success("Added to Cart");
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
        {medicine.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-sm">
        <div className="size-24 flex justify-center items-center mx-auto">
          <img
            src={medicine.image}
            alt={medicine.name}
            className="w-full h-full object-cover object-center mx-auto"
          />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center text-xs lg:text-sm">
        {medicine.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-sm">
        {medicine.company}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-sm">
        {medicine.type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-sm font-medium">
        <button
          className="text-primary-green hover:opacity-50 mr-4"
          onClick={() => addItemToCart(medicine)}
        >
          <BiCart size={30} />
        </button>
        <button
          className="text-primary-green hover:opacity-50"
          onClick={() => setDetailsOpen(true)}
        >
          <BsEye size={30} />
        </button>
        <DetailsModal
          key={medicine._id}
          open={detailsOpen}
          setOpen={setDetailsOpen}
          medicine={medicine}
        />
      </td>
    </tr>
  );
};

export default ShopTableData;
