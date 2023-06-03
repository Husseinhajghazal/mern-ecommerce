import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import Ratings from "../Products/Ratings";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { products } = useSelector((state) => state.product);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios
      .get(
        `https://ecommerce-server-ajsh.onrender.com/shop/get-shop-info/${id}`
      )
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch, id]);

  const totalReviewsLength =
    products &&
    products?.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex item-center justify-center">
              <div className="w-[150px] h-[150px] rounded-full">
                <img
                  src={`${data?.avatar}`}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <h3 className="text-center py-2 text-[20px]">{data?.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {data?.description}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{data?.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data?.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">{products?.length}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Shop Rating</h5>
            <h4 className="text-[#000000b0] mt-1">
              <Ratings rating={averageRating} />
            </h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000b0]">
              {data?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
              >
                <Link to="/dashboard/settings" className="text-white">
                  Edit Shop
                </Link>
              </div>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                onClick={() => {
                  localStorage.removeItem("seller-token");
                  localStorage.removeItem("expiresIn-seller");
                  window.location.reload();
                }}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
