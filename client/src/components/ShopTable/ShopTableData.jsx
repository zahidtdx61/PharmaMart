import { useState } from "react";
import { BiCart } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import DetailsModal from "./DetailsModal";
import { saveToLocalStorage } from "../../utils";
import toast from "react-hot-toast";

const ShopTableData = ({ medicine }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { user } = useAuth();
  const { uid } = user || {};
  console.log({ uid });

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
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-20 h-20 object-cover"
        />
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
