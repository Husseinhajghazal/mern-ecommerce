import React, { useEffect } from "react";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../components/Shop/Layout/DashboardSideBar";
import AllRefunds from "../components/Shop/AllRefunds";

const ShopAllRefunds = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[60px]">
          <DashboardSideBar active={8} />
        </div>
        <div className="calc-w justify-center flex">
          <AllRefunds />
        </div>
      </div>
    </div>
  );
};

export default ShopAllRefunds;
