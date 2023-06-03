import React, { useEffect } from "react";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../components/Shop/Layout/DashboardSideBar";
import Dashboard from "../components/Shop/Dashboard.jsx";

const ShopDashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <DashboardHeader />
      <div className="flex  justify-between w-full">
        <div className="800px:w-[330px] w-[60px]">
          <DashboardSideBar active={1} />
        </div>
        <div className="calc-w justify-center flex">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage;
