import React, { useEffect } from "react";
import Input from "../components/Input/Input";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ForgetPasswordPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = async (values) => {
    await axios
      .post(`https://ecommerce-server-ajsh.onrender.com/user/forget-password`, {
        email: values.email,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Required.")
      .email("Plese enter a valid email."),
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
          Forget Password
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
            initialValues={{ email: "" }}
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

export default ForgetPasswordPage;
