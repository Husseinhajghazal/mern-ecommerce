import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer, MdPassword } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiSettings } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="800px:w-[300px] h-[88.7vh] bg-white shadow-sm overflow-y-scroll fixed bottom-0 left-0 z-10">
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard size={30} color={active === 1 ? "#f27a1a" : "#555"} />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[#f27a1a]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/orders" className="w-full flex items-center">
          <FiShoppingBag size={30} color={active === 2 ? "#f27a1a" : "#555"} />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[#f27a1a]" : "text-[#555]"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/products" className="w-full flex items-center">
          <FiPackage size={30} color={active === 3 ? "#f27a1a" : "#555"} />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[#f27a1a]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/create-product"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={active === 4 ? "#f27a1a" : "#555"}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[#f27a1a]" : "text-[#555]"
            }`}
          >
            Create Product
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={active === 5 ? "#f27a1a" : "#555"}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[#f27a1a]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/create-event" className="w-full flex items-center">
          <VscNewFile size={30} color={active === 6 ? "#f27a1a" : "#555"} />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[#f27a1a]" : "text-[#555]"
            }`}
          >
            Create Event
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/coupons" className="w-full flex items-center">
          <AiOutlineGift size={30} color={active === 7 ? "#f27a1a" : "#555"} />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[#f27a1a]" : "text-[#555]"
            }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            color={active === 8 ? "#f27a1a" : "#555"}
          />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[#f27a1a]" : "text-[#555]"
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/settings" className="w-full flex items-center">
          <CiSettings size={30} color={active === 9 ? "#f27a1a" : "#555"} />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[#f27a1a]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/change-password"
          className="w-full flex items-center"
        >
          <MdPassword size={30} color={active === 10 ? "#f27a1a" : "#555"} />
          <h5
            className={`800px:block hidden pl-2 text-[18px] font-[400] ${
              active === 10 ? "text-[#f27a1a]" : "text-[#555]"
            }`}
          >
            Change Password
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
