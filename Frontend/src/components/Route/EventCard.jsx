import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);

    if (new Date(data?.endDate) < new Date()) {
      return toast.error("Event time has expired");
    }

    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w[50%] h-[400px] m-auto">
        <img
          className="m-auto object-none w-full h-full"
          loading="lazy"
          src={`${data?.images[0]}`}
          alt=""
        />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2
          className={`${styles.productTitle} 800px:!text-[25px] !text-[16px] mb-2`}
        >
          {data?.name}
        </h2>
        <p className="hidden 800px:block">{data?.description}</p>
        <p className="800px:hidden">{data?.description.slice(0, 100)}...</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice && data?.originalPrice + "$"}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#d55b45]">
            {data?.sold_out} sold
          </span>
        </div>
        <CountDown startdate={data?.startdate} endDate={data?.endDate} />
        <div className="flex items-center">
          <Link to={`/event/${data?._id}`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={addToCartHandler}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
