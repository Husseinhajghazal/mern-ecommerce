import React, { useState } from "react";
import styles from "../../styles/styles";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { motion } from "framer-motion";

import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const CartSingle = ({ data }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      dispatch(addToCart(updateCartData));
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    dispatch(addToCart(updateCartData));
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`bg-[#f27a1a] border border-[#f27a1a] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </motion.div>
          <span className="pl-[8px]">{data.qty}</span>
          <motion.div
            whileHover={{ scale: 1.2, color: "red" }}
            whileTap={{ scale: 0.9 }}
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </motion.div>
        </div>
        <div className="w-[80px] h-[80px] ml-2 mr-2 rounded-[5px]">
          <img
            loading="lazy"
            src={`${data?.images[0]}`}
            alt=""
            className="w-full h-full rounded-[5px] object-contain"
          />
        </div>
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            {data.discountPrice}$ x {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#f27a1a] font-Roboto">
            {totalPrice}$
          </h4>
        </div>
        <motion.div
          whileHover={{ color: "red" }}
          whileTap={{ scale: 0.9 }}
          className="grow"
          onClick={() => dispatch(removeFromCart(data))}
        >
          <RxCross1 size={10} className="cursor-pointer ml-auto mr-3" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartSingle;
