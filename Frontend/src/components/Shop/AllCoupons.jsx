import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";

import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../Input/Input";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupouns] = useState([]);

  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://ecommerce-server-ajsh.onrender.com/coupon-code/get-coupons/${seller?._id}`,
        {
          headers: {
            Authorization: localStorage.getItem("seller-token"),
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [seller?._id]);

  const handleDelete = async (id) => {
    axios
      .delete(
        `https://ecommerce-server-ajsh.onrender.com/coupon-code/delete-coupon/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("seller-token"),
          },
        }
      )
      .then((res) => {
        toast.success("Coupon code deleted succesfully!");
        let array = coupouns;
        array = array.filter((code) => code._id !== id);
        setCoupouns(array);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const submitHandler = async (values) => {
    setIsLoading(true);
    await axios
      .post(
        `https://ecommerce-server-ajsh.onrender.com/coupon-code/create-coupon-code`,
        {
          name: values.name,
          discountPercentage: values.discountPercentage,
          minAmount: values.minAmount,
          maxAmount: values.maxAmount,
          shopId: seller?._id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("seller-token"),
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        toast.success("Coupon code created successfully!");
        setOpen(false);
        let array = [res.data.couponCode, ...coupouns];
        setCoupouns(array);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message);
      });
  };

  const initialValues = {
    name: "",
    discountPercentage: "",
    maxAmount: "",
    minAmount: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("required"),
    discountPercentage: Yup.number()
      .required("required")
      .min(1, "at least 1%")
      .max(100, "at most 100%"),
  });

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "discountPercentage",
      headerName: "Discount Percentage",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupouns &&
    coupouns.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        discountPercentage: item.discountPercentage + " %",
      });
    });

  return (
    <AnimatePresence>
      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ y: "-120%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          className="w-full 800px:mx-8 mr-3 mt-3 bg-white"
        >
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          <AnimatePresence>
            {open && (
              <div className="fixed w-full h-screen top-0 left-0 z-40 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                  className="absolute w-full h-screen top-0 left-0 bg-[#00000030]"
                />
                <motion.div
                  initial={{ y: "-120%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  className="w-[90%] 800px:w-[40%] bg-white rounded-md shadow p-4"
                >
                  <div className="w-full flex justify-end">
                    <motion.div whileHover={{ scale: 1.2, color: "red" }}>
                      <RxCross1
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setOpen(false)}
                      />
                    </motion.div>
                  </div>
                  <h5 className="text-[30px] font-Poppins text-center">
                    Create Coupon code
                  </h5>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={submitHandler}
                    validationSchema={validationSchema}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <br />
                        <Input
                          id="name"
                          label="Name"
                          type="text"
                          placeholder="Enter your coupon code name..."
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={errors.name && touched.name}
                          error={errors.name}
                        />
                        <br />
                        <Input
                          id="discountPercentage"
                          label="Discount Percentage"
                          type="number"
                          placeholder="Enter your coupon code Percentage..."
                          value={values.discountPercentage}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={
                            errors.discountPercentage &&
                            touched.discountPercentage
                          }
                          error={errors.discountPercentage}
                        />
                        <br />
                        <Input
                          id="maxAmount"
                          label="Max Amount(optional)"
                          type="number"
                          placeholder="Enter your coupon code max amount..."
                          value={values.maxAmount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={errors.maxAmount && touched.maxAmount}
                          error={errors.maxAmount}
                        />
                        <br />
                        <Input
                          id="minAmount"
                          label="Min Amount(optional)"
                          type="number"
                          placeholder="Enter your coupon code min amount..."
                          value={values.minAmount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={errors.minAmount && touched.minAmount}
                          error={errors.minAmount}
                        />
                        <br />
                        <button
                          type="submit"
                          className={`${styles.button} !w-full`}
                        >
                          Create
                        </button>
                      </form>
                    )}
                  </Formik>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AllCoupons;
