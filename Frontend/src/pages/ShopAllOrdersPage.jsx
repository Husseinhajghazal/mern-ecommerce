import React, { useEffect } from "react";
import DashboardSideBar from "../components/Shop/Layout/DashboardSideBar";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import AllOrders from "../components/Shop/AllOrders";

const ShopAllOrdersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[60px]">
          <DashboardSideBar active={2} />
        </div>
        <div className="calc-w justify-center flex">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrdersPage;
