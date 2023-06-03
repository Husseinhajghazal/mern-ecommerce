import React, { useEffect } from "react";
import DashboardSideBar from "../components/Shop/Layout/DashboardSideBar";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import CreateProduct from "../components/Shop/CreateProduct";

const ShopCreateProduct = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="800px:w-[330px] w-[60px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="calc-w justify-center flex">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
