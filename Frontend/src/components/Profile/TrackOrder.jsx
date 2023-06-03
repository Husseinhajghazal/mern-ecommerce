import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrders } from "../../redux/actions/order";
import OrderSuccess from "./Motions/OrderSuccess";
import DeliveryPartner from "./Motions/DeliveryPartner";
import OrderOnTheWay from "./Motions/OrderOnTheWay";
import OrderProcessing from "./Motions/OrderProcessing";
import RefundSuccess from "./Motions/RefundSuccess";
import RefundProcessing from "./Motions/RefundProcessing";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrders(user?._id));
  }, [dispatch, user?._id]);

  const data = orders && orders.find((order) => order._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center flex-col gap-4 items-center">
      {
        <>
          {data && data?.status === "Processing" ? (
            <>
              <OrderProcessing />
              <h1 className="text-[20px]">Your Order is processing in shop.</h1>
            </>
          ) : data?.status === "Transferred to delivery partner" ? (
            <>
              <DeliveryPartner />
              <h1 className="text-[20px]">
                Your Order is on the way for delivery partner.
              </h1>
            </>
          ) : data?.status === "On the way" ? (
            <>
              <OrderOnTheWay />
              <h1 className="text-[20px]">
                Our Delivery man is going to deliver your order.
              </h1>
            </>
          ) : data?.status === "Delivered" ? (
            <>
              <OrderSuccess />
              <h1 className="text-[20px]">Your order is delivered!</h1>
            </>
          ) : data?.status === "Processing refund" ? (
            <>
              <RefundProcessing />
              <h1 className="text-[20px]">Your refund is processing!</h1>
            </>
          ) : data?.status === "Refund Success" ? (
            <>
              <RefundSuccess />
              <h1 className="text-[20px]">Your Refund is success!</h1>
            </>
          ) : null}
        </>
      }
    </div>
  );
};

export default TrackOrder;
