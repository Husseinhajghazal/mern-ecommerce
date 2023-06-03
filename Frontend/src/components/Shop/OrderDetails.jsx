import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";

import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
  }, [dispatch, seller?._id]);

  const data = orders && orders.find((order) => order._id === id);

  const orderUpdateHandler = async () => {
    await axios
      .put(
        `https://ecommerce-server-ajsh.onrender.com/order/update-order-status/${id}`,
        { status },
        {
          headers: {
            Authorization: localStorage.getItem("seller-token"),
          },
        }
      )
      .then((res) => {
        toast.success("Order status update succeeded.");
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  const refundOrderUpdateHandler = async () => {
    await axios
      .put(
        `https://ecommerce-server-ajsh.onrender.com/order/accept-refund/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: localStorage.getItem("seller-token"),
          },
        }
      )
      .then((res) => {
        toast.success("Order status update succeeded.");
        dispatch(getAllOrdersOfShop(seller._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  let myPrice = 0;

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="#f27a1a" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/dashboard/orders">
          <div
            className={`${styles.button} !bg-[#f27a1a54] !rounded-[4px] !text-[#f27a1a] font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>
      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order Id: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Date: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => {
          myPrice += item.discountPrice * item.qty;
          return (
            <div key={index} className="w-full flex items-start mb-5">
              <div className="w-[80px] h-[80px]">
                <img
                  src={`${item?.images[0]}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <h5 className="pl-3 800px:text-[20px]">{item.name}</h5>
                <h5 className="pl-3 800px:text-[20px] text-[#00000091]">
                  {item.discountPrice}$ x {item.qty}
                </h5>
              </div>
            </div>
          );
        })}
      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>{myPrice}$</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="text-[20px]">
            {data?.shippingAddress.country} / {data?.shippingAddress.state}
          </h4>
          <h4 className="text-[20px]">
            {data?.shippingAddress.address} / {data?.shippingAddress.zipCode}
          </h4>
          <h4 className="text-[20px]">{data?.user?.name}</h4>
          <h4 className="text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px] font-[600]">Payment Info:</h4>
          <h4 className="text-[20px]">type: {data?.paymentInfo?.type}</h4>
          <h4 className="text-[20px]">
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      <div className="flex mt-2 items-center">
        {data?.status === "Processing refund" ||
        data?.status === "Refund Success" ? (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] !h-[45px] pl-2"
          >
            {["Processing refund", "Refund Success"]
              .slice(
                ["Processing refund", "Refund Success"].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        ) : (
          <select
            className="!h-[45px] pl-2"
            value={status || data?.status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {[
              "Processing",
              "Transferred to delivery partner",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transferred to delivery partner",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}
        <div
          className={`${styles.button} !bg-[#f27a1a54] !rounded-[4px] !text-[#f27a1a] font-[600] !h-[45px] text-[12px] 800px:text-[16px]`}
          onClick={
            data?.status === "Processing refund" ||
            data?.status === "Refund Success"
              ? refundOrderUpdateHandler
              : orderUpdateHandler
          }
        >
          Update Status
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
