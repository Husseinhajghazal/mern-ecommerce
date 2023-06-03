import React from "react";
import styles from "../../styles/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../Input/Input";
import { motion } from "framer-motion";
import axios from "axios";

import { toast } from "react-toastify";

const MAX_FILE_SIZE = 204800;

const validFileExtensions = {
  image: ["jpg", "png", "jpeg"],
};

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

const SignupSeller = ({ onClick }) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };

  const submitHandler = async (values) => {
    const fd = new FormData();
    for (let value in values) {
      fd.append(value, values[value]);
    }
    axios
      .post(
        `https://ecommerce-server-ajsh.onrender.com/shop/create-shop`,
        fd,
        config
      )
      .then((res) => toast.success(res.data.message))
      .catch((err) => toast.error(err.response.data.message));
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required."),
    phoneNumber: Yup.string().required("Required."),
    address: Yup.string().required("Required."),
    zipCode: Yup.string().required("Required."),
    email: Yup.string()
      .required("Required.")
      .email("Plese enter a valid email."),
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
    image: Yup.mixed()
      .required("Required.")
      .test(
        "is-valid-size",
        "Max allowed size is 200KB",
        (value) => value && value.size <= MAX_FILE_SIZE
      )
      .test("is-valid-type", "Not a valid image type", (value) =>
        isValidFileType(value && value.name.toLowerCase(), "image")
      ),
  });

  return (
    <>
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: "-100px", opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a Seller
        </h2>
      </motion.div>
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: "-100px", opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={{
              email: "",
              password: "",
              image: "",
              name: "",
              phoneNumber: "",
              address: "",
              zipCode: "",
            }}
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
              setFieldValue,
            }) => (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  label="Shop Name"
                  id="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={errors.name && touched.name}
                  error={errors.name}
                />
                <Input
                  type="text"
                  label="Phone Number"
                  id="phoneNumber"
                  autoComplete="phone number"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={errors.phoneNumber && touched.phoneNumber}
                  error={errors.phoneNumber}
                />
                <Input
                  type="text"
                  label="Address"
                  id="address"
                  autoComplete="phone number"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={errors.address && touched.address}
                  error={errors.address}
                />
                <Input
                  type="text"
                  label="Zip Code"
                  id="zipCode"
                  autoComplete="phone number"
                  value={values.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={errors.zipCode && touched.zipCode}
                  error={errors.zipCode}
                />
                <Input
                  type="text"
                  label="Email address"
                  id="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={errors.email && touched.email}
                  error={errors.email}
                />
                <Input
                  type="password"
                  label="Password"
                  id="password"
                  autoComplete="current password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={errors.password && touched.password}
                  error={errors.password}
                />
                <Input
                  type="image"
                  id="image"
                  value={values.image}
                  onChange={(a, b) => setFieldValue(a, b)}
                  onBlur={handleBlur}
                  isValid={errors.image && touched.image}
                  error={errors.image}
                />
                <div>
                  <button
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#f27a1a] hover:bg-[#f27a1aba] duration-300"
                  >
                    Submit
                  </button>
                </div>
                <div className={`${styles.noramlFlex} w-full`}>
                  <h4>Already have any account?</h4>
                  <button
                    type="button"
                    onClick={onClick}
                    className="text-[#f27a1aba] pl-2"
                  >
                    Login
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </motion.div>
    </>
  );
};

export default SignupSeller;
