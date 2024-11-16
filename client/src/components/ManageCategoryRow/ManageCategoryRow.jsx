import { useNavigate } from "react-router-dom";

const ManageCategoryRow = ({ category, index }) => {
  const navigate = useNavigate();

  return (
    <tr className="border-b-2">
      <td className="py-2 px-1">{index + 1}</td>
      <td className="py-2 px-1">{category.name}</td>
      <td className="py-2 px-1">
        <div className="size-24 flex items-center justify-center mx-auto">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
      </td>

      <td className="py-2 px-1">
        {new Date(category.createdAt).toLocaleDateString()}
      </td>
      <td className="py-2 px-1">
        <button
          onClick={() => navigate(`/dashboard/edit-category/${category._id}`)}
          className="px-6 py-1 bg-sky-600 text-zinc-100 rounded-md hover:opacity-65"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ManageCategoryRow;
