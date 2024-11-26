import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/${category._id}`}>
      <div className="border-zinc-100 border-2 p-8 rounded-md shadow-md">
        <div>
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-[200px] object-cover hover:scale-105 transition-transform"
          />
        </div>

        <div>
          <div className="text-center text-xl font-semibold text-primary-teal">
            {category.name}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
