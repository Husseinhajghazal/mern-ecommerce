import React, { useEffect } from "react";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";
import OrderDetails from "../components/Shop/OrderDetails";

const OrderDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <DashboardHeader />
      <OrderDetails />
    </div>
  );
};

export default OrderDetailsPage;
