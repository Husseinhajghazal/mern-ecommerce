import React, { useEffect } from "react";
import DashboardSideBar from "../components/Shop/Layout/DashboardSideBar";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import AllEvents from "../components/Shop/AllEvents";

const ShopAllEvents = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[60px]">
          <DashboardSideBar active={5} />
        </div>
        <div className="calc-w justify-center flex">
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEvents;
