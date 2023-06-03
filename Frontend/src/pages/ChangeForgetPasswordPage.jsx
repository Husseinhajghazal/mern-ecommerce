import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Input from "../components/Input/Input";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

const ChangeForgetPasswordPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialValues = {
    oldPassword: "",
    password: "",
    confirmedPassword: "",
  };

  const submitHandler = async (values) => {
    await axios
      .put(
        `https://ecommerce-server-ajsh.onrender.com/user/change-forget-password/${token}`,
        {
          oldPassword: values.oldPassword,
          password: values.password,
          confirmedPassword: values.confirmedPassword,
        }
      )
      .then((res) => toast.success(res.data.message))
      .catch((error) => toast.error(error.response.data.message));
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Required."),
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
    confirmedPassword: Yup.string().required("Required."),
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: "-100px", opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Change Password
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
              <form className="space-y-6" onSubmit={handleSubmit}>
                <Input
                  id="oldPassword"
                  label="Old Password"
                  type="password"
                  value={values.oldPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={errors.oldPassword && touched.oldPassword}
                  error={errors.oldPassword}
                />
                <Input
                  id="password"
                  label="New Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={errors.password && touched.password}
                  error={errors.password}
                />
                <Input
                  id="confirmedPassword"
                  label="Confirm Password"
                  type="password"
                  value={values.confirmedPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={
                    errors.confirmedPassword && touched.confirmedPassword
                  }
                  error={errors.confirmedPassword}
                />
                <div>
                  <button
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#f27a1a] hover:bg-[#f27a1aba] duration-300"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangeForgetPasswordPage;
