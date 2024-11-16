import { Divider, useColorScheme } from "@mui/joy";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import {
  decreaseOneFromCart,
  deleteFromWishlist,
  getFromLocalStorage,
  increaseOneFromCart,
} from "../utils";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { user } = useAuth();
  const { uid } = user || {};
  const { mode } = useColorScheme();

  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const user_id = uid || "unregistered";
    const data = getFromLocalStorage(user_id);
    setCartData(data);
    let total = 0;
    data?.forEach((item) => {
      total += parseFloat(item.pricePerUnit) * parseFloat(item.addedQuantity);
    });
    setTotalPrice(total);
  }, [uid]);

  const removeItem = (id) => {
    const user_id = uid || "unregistered";
    deleteFromWishlist(user_id, id);
    const data = getFromLocalStorage(user_id);
    setCartData(data);
    let total = 0;
    data?.forEach((item) => {
      total += parseFloat(item.pricePerUnit) * parseFloat(item.addedQuantity);
    });
    setTotalPrice(total);
    toast.success("Item removed from cart");
  };

  const addOne = (id) => {
    const user_id = uid || "unregistered";
    const added = increaseOneFromCart(user_id, id);
    if (added === "failed") {
      toast.error("You can't add more than available quantity");
      return;
    }
    const data = getFromLocalStorage(user_id);
    setCartData(data);
    let total = 0;
    data?.forEach((item) => {
      total += parseFloat(item.pricePerUnit) * parseFloat(item.addedQuantity);
    });
    setTotalPrice(total);
    toast.success("Item count increased");
  };

  const removeOne = (id) => {
    const user_id = uid || "unregistered";
    decreaseOneFromCart(user_id, id);
    const data = getFromLocalStorage(user_id);
    setCartData(data);
    let total = 0;
    data?.forEach((item) => {
      total += parseFloat(item.pricePerUnit) * parseFloat(item.addedQuantity);
    });
    setTotalPrice(total);
    toast.success("Item count decreased");
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <div>
        <h1 className="text-4xl font-semibold text-primary-teal text-center border-b-2 w-fit mx-auto px-2 py-2 border-primary-green">
          Cart
        </h1>
        <h2 className="font-fira-sans text-center text-primary-teal mt-4">
          Here you can see your cart details.
        </h2>
      </div>

      <div className="max-w-screen-xl mx-auto overflow-x-scroll lg:overflow-auto">
        {cartData?.length > 0 ? (
          <>
            <table className="divide-y w-full divide-gray-200 mt-6 text-lg mx-auto">
              <thead
                className={`${mode === "light" ? "bg-gray-50" : "bg-sky-950"}`}
              >
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Name
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Image
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Price Per Unit
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Quantity
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Price
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Type
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="text-center divide-y divide-gray-300">
                {cartData.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                      <div className="size-24 flex justify-center items-center mx-auto">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center mx-auto"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                      {item.pricePerUnit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium ">
                      <span>{item.addedQuantity}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                      {parseFloat(item?.pricePerUnit) *
                        parseFloat(item?.addedQuantity)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium ">
                      <button
                        className="text-green-500 hover:opacity-50"
                        onClick={() => addOne(item._id)}
                      >
                        <BiPlusCircle size={30} />
                      </button>
                      <button
                        className="text-red-500 hover:opacity-50 ml-2"
                        onClick={() => removeOne(item._id)}
                      >
                        <BiMinusCircle size={30} />
                      </button>
                      <button
                        className="text-red-500 hover:opacity-50 ml-2"
                        onClick={() => removeItem(item._id)}
                      >
                        <FiDelete size={30} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Divider />

            <div className="flex  flex-col justify-center items-end gap-4 mt-4">
              <h1 className="text-base font-semibold text-primary-teal">
                Total Price: {totalPrice} BDT
              </h1>
              <button onClick={() => navigate("/checkout")} className="px-3 py-1 bg-primary-teal text-zinc-50 font-semibold font-lexend rounded-md">
                Checkout
              </button>
            </div>
          </>
        ) : (
          <h1 className="text-xl text-center font-semibold text-primary-teal mt-4">
            No items. Your Cart is Empty
          </h1>
        )}
      </div>
    </div>
  );
};

export default Cart;
