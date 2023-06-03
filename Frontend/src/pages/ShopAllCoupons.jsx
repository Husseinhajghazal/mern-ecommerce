import React, { useEffect } from "react";
import DashboardSideBar from "../components/Shop/Layout/DashboardSideBar";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import AllCoupons from "../components/Shop/AllCoupons";

const ShopAllCoupons = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[60px]">
          <DashboardSideBar active={7} />
        </div>
        <div className="calc-w justify-center flex">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCoupons;
