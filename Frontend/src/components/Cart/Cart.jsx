import React from "react";
import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import CartSingle from "./CartSingle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  return (
    <div className="fixed top-0 left-0 w-full z-40 h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setOpenCart(false)}
        className="absolute w-full h-screen top-0 left-0 bg-[#00000030]"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ damping: 0 }}
        className="handleSize absolute top-0 right-0 h-screen bg-white flex flex-col overflow-y-scroll jusitfy-between shadow-sm"
      >
        <div className="flex w-full justify-end pt-5 pr-5">
          <motion.div
            whileHover={{ scale: 1.2, color: "red" }}
            whileTap={{ scale: 0.9 }}
          >
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </motion.div>
        </div>
        {cart && cart.length !== 0 && (
          <div>
            <div className={`${styles.noramlFlex} p-4`}>
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {cart?.length === 1
                  ? cart?.length + " item"
                  : cart?.length + " items"}
              </h5>
            </div>
            <div className="w-[100%] h-[45px] px-5">
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center bg-[#f27a1a] rounded-[5px]`}
                >
                  <h1 className="m-auto text-[#fff] text-[12px] 800px:text-[18px] font-[600]">
                    Chechout Now ({totalPrice}$)
                  </h1>
                </div>
              </Link>
            </div>
          </div>
        )}
        <br />
        <div className="w-full border-t">
          {cart && cart.length === 0 ? (
            <p className="m-auto mt-2 text-center">Cart is empty</p>
          ) : (
            cart && cart.map((i, index) => <CartSingle key={index} data={i} />)
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
