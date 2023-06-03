import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../Input/Input";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import axios from "axios";

const ChangePassword = () => {
  const initialValues = {
    oldPassword: "",
    password: "",
    confirmedPassword: "",
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

  const submitHandler = async (values) => {
    if (values.password !== values.confirmedPassword) {
      return toast.warn("Password should be the same in both inputs.");
    }

    await axios
      .put(
        `https://ecommerce-server-ajsh.onrender.com/user/change-password`,
        {
          oldPassword: values.oldPassword,
          password: values.password,
          confirmedPassword: values.confirmedPassword,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => toast.success(res.data.message))
      .catch((error) => toast.error(error.response.data.message));
  };

  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2 pt-2">
        Change Password
      </h1>
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
          <div className="w-full">
            <form
              className="flex items-center flex-col"
              onSubmit={handleSubmit}
            >
              <br />
              <Input
                id="oldPassword"
                label="Old Password"
                type="password"
                value={values.oldPassword}
                onChange={handleChange}
                className="w-[100%] 800px:!w-[50%]"
                onBlur={handleBlur}
                isValid={errors.oldPassword && touched.oldPassword}
                error={errors.oldPassword}
              />
              <br />
              <Input
                id="password"
                label="New Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                className="w-[100%] 800px:!w-[50%]"
                onBlur={handleBlur}
                isValid={errors.password && touched.password}
                error={errors.password}
              />
              <br />
              <Input
                id="confirmedPassword"
                label="Confirm Password"
                type="password"
                value={values.confirmedPassword}
                onChange={handleChange}
                className="w-[100%] 800px:!w-[50%]"
                onBlur={handleBlur}
                isValid={errors.confirmedPassword && touched.confirmedPassword}
                error={errors.confirmedPassword}
              />
              <br />
              <button type="submit" className={`${styles.button}`}>
                Submit
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
