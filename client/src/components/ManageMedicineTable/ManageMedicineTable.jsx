import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";
import { LuDelete } from "react-icons/lu";

const ManageMedicineTable = ({ medicine }) => {
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
      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-sm text-center">
        {medicine.pricePerUnit}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-sm">{medicine.type}</td>
      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-sm font-medium">
        <button className="text-primary-green hover:opacity-50 mr-4">
          <BiEdit size={30} />
        </button>
        <button
          className="text-primary-green hover:opacity-50"
        >
          <LuDelete size={30} />
        </button>
          
      </td>
    </tr>
  );
};

export default ManageMedicineTable;
