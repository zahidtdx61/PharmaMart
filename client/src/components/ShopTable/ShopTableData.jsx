import { useState } from "react";
import { BiCart } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import DetailsModal from "./DetailsModal";

const ShopTableData = ({ medicine }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
        {medicine.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-20 h-20 object-cover"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {medicine.company}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{medicine.type}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button className="text-primary-green hover:opacity-50 mr-4">
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
