import React from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { motion } from "framer-motion";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";

const WishSingle = ({ data }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <motion.div
          whileHover={{ scale: 1.2, color: "red" }}
          whileTap={{ scale: 0.9 }}
        >
          <RxCross1
            className="cursor-pointer"
            onClick={() => removeFromWishlistHandler(data)}
          />
        </motion.div>
        <div className="w-[80px] h-[80px] ml-2">
          <img
            loading="lazy"
            src={`${data?.images[0]}`}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="pl-[5px] pr-[10px]">
          <h1>{data.name}</h1>
        </div>
        <motion.div
          whileHover={{ color: "#17dd1f" }}
          whileTap={{ scale: 0.9 }}
          className="grow"
          onClick={() => addToCartHandler(data?._id)}
        >
          <BsCartPlus
            size={20}
            className="cursor-pointer ml-auto mr-3"
            tile="Add to cart"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default WishSingle;
