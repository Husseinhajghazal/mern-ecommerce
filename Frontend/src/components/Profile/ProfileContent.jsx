import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineCamera } from "react-icons/ai";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../Input/Input";
import AllOrders from "./AllOrders";
import AllRefundOrders from "./AllRefundOrders";
import TrackOrderList from "./TrackOrderList";
import PaymentMethod from "./ChangePassword";
import Address from "./Address.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { updateUserInfo } from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "../../styles/styles";

const ProfileContent = ({ active }) => {
  const dispatch = useDispatch();

  const { user, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const initialValues = {
    name: user?.name,
    email: user?.email,
    phoneNumber: user?.phoneNumber || "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required."),
    email: Yup.string()
      .required("Required.")
      .email("Plese enter a valid email."),
    phoneNumber: Yup.string().required("Required."),
    password: Yup.string()
      .required("Required.")
      .min(8, "Min length of the password should be 8.")
      .max(16, "Max length of the password should be 16.")
      .matches(
        /(?=.*?[A-Z])/g,
        "Password should contain at least 1 big letter."
      )
      .matches(
        /(?=.*?[a-z])/g,
        "Password should contain at least 1 small letter."
      )
      .matches(/(?=.*?[0-9])/g, "Password should contain at least 1 number."),
  });

  const submitHandler = async (values) => {
    dispatch(
      updateUserInfo(
        values.email,
        values.password,
        values.phoneNumber,
        values.name
      )
    );
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("image", file);

    await axios
      .put(
        `https://ecommerce-server-ajsh.onrender.com/user/update-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => window.location.reload())
      .catch((error) => toast.error(error));
  };

  return (
    <div className="w-full">
      <AnimatePresence>
        {active === 1 && (
          <>
            <motion.div
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex justify-center w-full"
            >
              <div className="relative">
                <div className="w-[150px] h-[150px] rounded-full border-[3px] border-[#E3E9EE]">
                  <img
                    loading="lazy"
                    src={`${user?.avatar}`}
                    className="w-full h-full object-cover rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={handleImage}
                  />
                  <label htmlFor="image">
                    <AiOutlineCamera />
                  </label>
                </div>
              </div>
            </motion.div>
            <br />
            <br />
            <motion.div
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full px-5"
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
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
                    <div className="w-full 800px:flex block">
                      <Input
                        id="name"
                        className="w-[100%] mb-4 800px:w-[50%]"
                        classNameInput="800px:!w-[95%] 800px:mb-0"
                        label="Full Name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={errors.name && touched.name}
                        error={errors.name}
                      />
                      <Input
                        id="email"
                        className="w-[100%] mb-4 800px:w-[50%]"
                        classNameInput="800px:!w-[95%] 800px:mb-0"
                        label="Email Address"
                        type="text"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={errors.email && touched.email}
                        error={errors.email}
                      />
                    </div>
                    <div className="w-full 800px:flex block">
                      <Input
                        id="phoneNumber"
                        className="w-[100%] mb-4 800px:w-[50%]"
                        classNameInput="800px:!w-[95%] 800px:mb-0"
                        label="Phone Number"
                        type="text"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={errors.phoneNumber && touched.phoneNumber}
                        error={errors.phoneNumber}
                      />
                      <Input
                        id="password"
                        className="w-[100%] mb-4 800px:w-[50%]"
                        classNameInput="800px:!w-[95%] 800px:mb-0"
                        profile
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={errors.password && touched.password}
                        error={errors.password}
                      />
                    </div>
                    <div className="w-full text-center">
                      <button
                        type="submit"
                        className={`${styles.button} m-auto`}
                      >
                        Update
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active === 2 && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <AllOrders />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active === 3 && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <AllRefundOrders />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active === 4 && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <TrackOrderList />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active === 5 && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <PaymentMethod />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active === 6 && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Address />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileContent;
