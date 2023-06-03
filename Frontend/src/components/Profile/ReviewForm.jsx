import React, { useState } from "react";
import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar } from "react-icons/ai";

import styles from "../../styles/styles";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";

const ReviewForm = ({ setOpen, open, data }) => {
  const { user } = useSelector((state) => state.user);
  const [hoverRating, setHoverRating] = useState(0);

  const submitHandler = async (values) => {
    if (values.rating < 1) return toast.error("Please rate us 5 stars.");

    await axios
      .put(
        `https://ecommerce-server-ajsh.onrender.com/product/create-new-review`,
        {
          user,
          rating: values.rating,
          comment: values.comment,
          productId: data?._id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOpen(false);
      })
      .catch((error) => {
        toast.error("Something went wrong please.");
      });
  };

  return (
    <div className="fixed w-full h-screen top-0 left-0 z-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setOpen(!open)}
        className="absolute w-full h-screen top-0 left-0 bg-[#00000030]"
      />
      <motion.div
        initial={{ y: "-120%" }}
        animate={{ y: 0 }}
        exit={{ y: "-120%" }}
        className="w-[90%] 800px:w-[50%] h-min 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4"
      >
        <motion.div
          whileHover={{ scale: 1.1, color: "red" }}
          className="absolute right-3 top-3 z-50"
        >
          <RxCross1 size={25} onClick={() => setOpen(false)} />
        </motion.div>
        <br />
        <h2 className="text-[30px] font-[500] font-Poppins text-center">
          Write Your Review
        </h2>
        <br />
        <div className="w-full flex border-b pb-5">
          <img
            src={`${data?.images[0]}`}
            alt=""
            className="w-[80px] h-[80px]"
          />
          <div>
            <div className="pl-3 text-[14px] 800px:text-[18px]">
              {data?.name}
            </div>
            <h4 className="pl-3 text-[#555]">
              {data?.discountPrice}$ x {data?.qty}
            </h4>
          </div>
        </div>
        <Formik
          initialValues={{ rate: 1, comment: "" }}
          onSubmit={submitHandler}
        >
          {({ values, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <h5 className="pt-2 pl-3 text-[20px] font-[500]">Rate us :</h5>
              <div className="flex w-full ml-2 pt-1">
                {[1, 2, 3, 4, 5].map((i) =>
                  values.rating >= i ? (
                    <AiFillStar
                      id="rating"
                      key={i}
                      className="mr-1 cursor-pointer"
                      color="rgb(246,186,0)"
                      size={25}
                      onMouseEnter={() => {
                        setHoverRating(0);
                      }}
                      onClick={() => setFieldValue("rating", i)}
                    />
                  ) : (
                    <AiFillStar
                      id="rating"
                      key={i}
                      className="mr-1 cursor-pointer"
                      color={hoverRating >= i ? "rgb(246, 186, 0)" : "#999"}
                      onMouseEnter={() => {
                        setHoverRating(i);
                      }}
                      onMouseLeave={() => setHoverRating(0)}
                      size={25}
                      onClick={() => {
                        setHoverRating(0);
                        setFieldValue("rating", i);
                      }}
                    />
                  )
                )}
              </div>
              <div className="w-full ml-3 mt-1">
                <label className="block text-[20px] font-[500]">
                  Write a comment
                  <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="comment"
                  cols="20"
                  rows="5"
                  value={values.comment}
                  onChange={handleChange}
                  placeholder="How was your product? write your expresion about it!"
                  className="mt-2 w-[95%] border p-2 outline-none"
                />
              </div>
              <button
                className={`${styles.button} text-white text-[20px] m-auto`}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default ReviewForm;
