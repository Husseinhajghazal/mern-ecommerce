import React from "react";
import styles from "../../styles/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../Input/Input";
import { motion } from "framer-motion";
import axios from "axios";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const LoginSeller = ({ onClick }) => {
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    await axios
      .post(`https://ecommerce-server-ajsh.onrender.com/shop/login-shop`, {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        localStorage.setItem("seller-token", `Bearer ${res.data.token}`);
        localStorage.setItem("expiresIn-seller", res.data.expires);
        navigate("/dashboard");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const validationSchema = Yup.object({
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
          Login to your shop
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
            initialValues={{ email: "", password: "" }}
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
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                <div className={`${styles.noramlFlex} justify-between`}>
                  <div className={`${styles.noramlFlex}`}>
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      to="/shop/forgot-password"
                      className="font-medium text-[#f27a1a] hover:text-[#f27a1aba] duration-300"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#f27a1a] hover:bg-[#f27a1aba] duration-300"
                  >
                    Submit
                  </button>
                </div>
                <div className={`${styles.noramlFlex} w-full`}>
                  <h4>Not have any account?</h4>
                  <button
                    type="button"
                    onClick={onClick}
                    className="text-[#f27a1a] pl-2"
                  >
                    Sign Up
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

export default LoginSeller;
