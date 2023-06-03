import React from "react";
import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import styles from "../../styles/styles";
import WishSingle from "./WishSingle";
import { useSelector } from "react-redux";

const WishList = ({ setOpenWishList }) => {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <div className="fixed top-0 left-0 w-full z-40 h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setOpenWishList(false)}
        className="absolute w-full h-screen top-0 left-0 bg-[#00000030]"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ damping: 0 }}
        className="absolute top-0 right-0 h-screen overflow-y-scroll handleSize w-[25%] bg-white flex flex-col jusitfy-between shadow-sm"
      >
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <motion.div
              whileHover={{ scale: 1.2, color: "red" }}
              whileTap={{ scale: 0.9 }}
            >
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </motion.div>
          </div>
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {wishlist?.length === 0
                ? "No Items"
                : wishlist?.length === 1
                ? wishlist?.length + " Item"
                : wishlist?.length + " Items"}
            </h5>
          </div>
          <br />
          <div className="w-full border-t">
            {wishlist &&
              wishlist.map((i, index) => <WishSingle key={index} data={i} />)}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WishList;
