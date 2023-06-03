import React, { useEffect } from "react";
import DashboardSideBar from "../components/Shop/Layout/DashboardSideBar";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import CreateEvent from "../components/Shop/CreateEvent";

const ShopCreateEvent = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="800px:w-[330px] w-[60px]">
          <DashboardSideBar active={6} />
        </div>
        <div className="calc-w justify-center flex">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEvent;
