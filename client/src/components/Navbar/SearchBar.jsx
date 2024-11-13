import { useForm } from "react-hook-form";
import { CgSearch } from "react-icons/cg";

const SearchBar = () => {
  const { register, handleSubmit } = useForm();
  const handleSearch = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full mx-auto">
      <form
        onSubmit={handleSubmit((data) => handleSearch(data))}
        className="relative border rounded border-primary-teal"
      >
        <label htmlFor="Search" className="sr-only">
          {" "}
          Search{" "}
        </label>

        <input
          type="text"
          id="Search"
          {...register("search")}
          placeholder="Search for products..."
          className="w-full rounded-md  px-2 py-2.5 pe-10 shadow-sm text-primary-teal outline-none sm:text-base"
        />

        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="submit" className="text-primary-teal">
            <span className="sr-only">Search</span>
            <CgSearch size={25} />
          </button>
        </span>
      </form>
    </div>
  );
};

export default SearchBar;
