import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/actions/order";

import ReviewForm from "./ReviewForm";
import { AnimatePresence } from "framer-motion";
import { AiOutlineComment } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState({});

  const [open, setOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrders(user?._id));
  }, [dispatch, user?._id]);

  const data = orders && orders.find((order) => order._id === id);

  const refundHandler = async () => {
    await axios
      .put(
        `https://ecommerce-server-ajsh.onrender.com/order/refund/${id}`,
        { status: "Processing refund" },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        toast.success("Your request waiting the acceptance of seller.");
        dispatch(getAllOrders(user?._id));
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  let myPrice = 0;

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="#f27a1a" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
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
              {data?.status === "Delivered" && (
                <div
                  onClick={() => {
                    setOpen(!open);
                    setSelectedItem(item);
                  }}
                  className="text-[#e94560] bg-[#FCE1E6] text-center p-2 cursor-pointer rounded-[5px]"
                >
                  <AiOutlineComment />
                </div>
              )}
            </div>
          );
        })}
      <AnimatePresence>
        {open && (
          <ReviewForm open={open} setOpen={setOpen} data={selectedItem} />
        )}
      </AnimatePresence>
      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>{myPrice}$</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex">
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
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px] font-[600]">Order Info:</h4>
          <h4 className="text-[20px]">Status: {data?.status}</h4>
        </div>
      </div>
      {data?.status === "Delivered" && (
        <>
          <br />
          <br />
          <button
            type="button"
            onClick={refundHandler}
            className={`${styles.button} bg-red-500 hover:bg-red-300`}
          >
            Refund it
          </button>
        </>
      )}
    </div>
  );
};

export default UserOrderDetails;
