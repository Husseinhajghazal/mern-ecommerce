import React, { useEffect, useState } from "react";
import ProductCard from "../Route/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";

import Ratings from "../Products/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.product);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(id));
  }, [dispatch, id]);

  const [active, setActive] = useState(1);

  const allReviews =
    products && products?.map((product) => product.reviews).flat();

  const { events } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllEventsShop(seller?._id));
  }, [dispatch, seller?._id]);

  return (
    <div className="w-full text-center">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex justify-around 800px:justify-start">
          <div onClick={() => setActive(1)} className="flex items-center">
            <h5
              className={`font-[600] text-[14px] 800px:text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer 800px:pr-[20px]`}
            >
              Products
            </h5>
          </div>
          <div onClick={() => setActive(2)} className="flex items-center">
            <h5
              className={`font-[600] text-[14px] 800px:text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer 800px:pr-[20px]`}
            >
              Events
            </h5>
          </div>
          <div onClick={() => setActive(3)} className="flex items-center">
            <h5
              className={`font-[600] text-[14px] 800px:text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer 800px:pr-[20px]`}
            >
              Reviews
            </h5>
          </div>
        </div>
        {isOwner && (
          <div>
            <Link to="/dashboard">
              <div className={`${styles.button} !rounded-[4px] !h-[42px]`}>
                <span className="text-[#fff]">Dashboard</span>
              </div>
            </Link>
          </div>
        )}
      </div>
      <br />
      {active === 1 && (
        <>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {products &&
              products?.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))}
          </div>
          {products && products?.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Products have for this shop!
            </h5>
          )}
        </>
      )}
      {active === 2 && (
        <>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {events &&
              events?.map((i, index) => (
                <ProductCard
                  data={i}
                  key={index}
                  isShop={true}
                  isEvent={true}
                />
              ))}
          </div>
          {events && events?.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Events have for this shop!
            </h5>
          )}
        </>
      )}
      {active === 3 && (
        <div className="w-full text-start">
          {allReviews &&
            allReviews.map((item, index) => (
              <div key={index} className="w-full flex mt-2 border-b pb-2">
                <img
                  src={`${item?.user.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2">
                  <div className="flex">
                    <h1 className="font-[500]">{item.user.name}</h1>
                    <p className="text-[#999] text-[10px] ml-2">
                      ({item.createdAt.slice(0, 10)})
                    </p>
                  </div>
                  <Ratings rating={item?.rating} />
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
