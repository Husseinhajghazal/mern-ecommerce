import React from "react";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { motion } from "framer-motion";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";

const ProfileSider = ({ active, setActive }) => {
  return (
    <div className="w-full 800px:block flex bg-white shadow-sm rounded-[10px] p-4 800px:pt-8">
      <motion.div
        whileHover={{ color: "#f27a1a", scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setActive(1)}
        className="flex  cursor-pointer w-full 800px:mb-8"
      >
        <RxPerson size={20} color={active === 1 ? "#f27a1a" : null} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[#f27a1a]" : null
          } 800px:block hidden`}
        >
          Profile
        </span>
      </motion.div>
      <motion.div
        whileHover={{ color: "#f27a1a", scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setActive(2)}
        className="flex items-center cursor-pointer w-full 800px:mb-8"
      >
        <HiOutlineShoppingBag
          size={20}
          color={active === 2 ? "#f27a1a" : null}
        />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[#f27a1a]" : null
          } 800px:block hidden`}
        >
          Orders
        </span>
      </motion.div>
      <motion.div
        whileHover={{ color: "#f27a1a", scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setActive(3)}
        className="flex items-center cursor-pointer w-full 800px:mb-8"
      >
        <HiOutlineReceiptRefund
          size={20}
          color={active === 3 ? "#f27a1a" : null}
        />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[#f27a1a]" : null
          } 800px:block hidden`}
        >
          Refunds
        </span>
      </motion.div>
      <motion.div
        whileHover={{ color: "#f27a1a", scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setActive(4)}
        className="flex items-center cursor-pointer w-full 800px:mb-8"
      >
        <MdOutlineTrackChanges
          size={20}
          color={active === 4 ? "#f27a1a" : ""}
        />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[#f27a1a]" : ""
          } 800px:block hidden`}
        >
          Track Order
        </span>
      </motion.div>
      <motion.div
        whileHover={{ color: "#f27a1a", scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setActive(5)}
        className="flex items-center cursor-pointer w-full 800px:mb-8"
      >
        <RiLockPasswordLine size={20} color={active === 5 ? "#f27a1a" : ""} />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[#f27a1a]" : ""
          } 800px:block hidden`}
        >
          Change Password
        </span>
      </motion.div>
      <motion.div
        whileHover={{ color: "#f27a1a", scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setActive(6)}
        className="flex items-center cursor-pointer w-full 800px:mb-8"
      >
        <TbAddressBook size={20} color={active === 6 ? "#f27a1a" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-[#f27a1a]" : ""
          } 800px:block hidden`}
        >
          Address
        </span>
      </motion.div>
      <motion.div
        whileHover={{ color: "#f27a1a", scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("expiresIn");
          window.location.reload();
        }}
        className="flex items-center cursor-pointer w-full 800px:mb-8"
      >
        <AiOutlineLogout size={20} color={active === 7 ? "#f27a1a" : ""} />
        <span
          className={`pl-3 ${
            active === 7 ? "text-[#f27a1a]" : ""
          } 800px:block hidden`}
        >
          Log out
        </span>
      </motion.div>
    </div>
  );
};

export default ProfileSider;
