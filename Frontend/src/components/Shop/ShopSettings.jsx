import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Input from "../Input/Input";
import { Formik } from "formik";
import * as Yup from "yup";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);

  const handleImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("image", file);

    await axios
      .put(
        `https://ecommerce-server-ajsh.onrender.com/shop/update-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("seller-token"),
          },
        }
      )
      .then((res) => window.location.reload())
      .catch((error) => toast.error(error));
  };

  const initialValues = {
    name: seller?.name,
    email: seller?.email,
    phoneNumber: seller?.phoneNumber || "",
    address: seller?.address || "",
    zipCode: seller?.zipCode || "",
    description: seller?.description || "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required."),
    email: Yup.string()
      .required("Required.")
      .email("Plese enter a valid email."),
    phoneNumber: Yup.string().required("Required."),
    address: Yup.string().required("Required."),
    zipCode: Yup.string().required("Required."),
    description: Yup.string().required("Required."),
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
    await axios
      .put(
        `https://ecommerce-server-ajsh.onrender.com/shop/update-info`,
        {
          name: values.name,
          address: values.address,
          email: values.email,
          zipCode: values.zipCode,
          phoneNumber: values.phoneNumber,
          description: values.description,
          password: values.password,
        },
        {
          headers: {
            Authorization: localStorage.getItem("seller-token"),
          },
        }
      )
      .then((res) => {
        toast.success("Shop info updated succesfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <motion.div
          initial={{ y: -300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-center w-full"
        >
          <div className="relative">
            <img
              loading="lazy"
              src={`${seller?.avatar}`}
              className="w-[150px] h-[150px] rounded-full border-[3px] border-[#E3E9EE]"
              alt=""
            />
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
                <div className="w-full 800px:flex block">
                  <Input
                    id="address"
                    className="w-[100%] mb-4 800px:w-[50%]"
                    classNameInput="800px:!w-[95%] 800px:mb-0"
                    label="Address"
                    type="text"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={errors.address && touched.address}
                    error={errors.address}
                  />
                  <Input
                    id="zipCode"
                    className="w-[100%] mb-4 800px:w-[50%]"
                    classNameInput="800px:!w-[95%] 800px:mb-0"
                    label="Zip Code"
                    type="text"
                    value={values.zipCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={errors.zipCode && touched.zipCode}
                    error={errors.zipCode}
                  />
                </div>
                <div className="w-full 800px:flex block">
                  <Input
                    id="description"
                    className="w-[100%] mb-4"
                    classNameInput="800px:!w-[97.5%] 800px:mb-0"
                    label="Description"
                    type="textarea"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={errors.description && touched.description}
                    error={errors.description}
                  />
                </div>
                <div className="w-full text-center">
                  <button className={`${styles.button} m-auto`} type="submit">
                    Update
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopSettings;
