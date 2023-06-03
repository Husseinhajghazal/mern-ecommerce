import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { AnimatePresence, motion } from "framer-motion";
import { Formik } from "formik";
import * as Yup from "yup";
import { RxCross1 } from "react-icons/rx";
import Input from "../Input/Input";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress, deleteUserAddress } from "../../redux/actions/user";

const Address = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);

  const initialValues = {
    country: "",
    state: "",
    address: "",
    zipCode: "",
    addressName: "Default",
  };

  const validationSchema = Yup.object({
    country: Yup.string().required("Required."),
    state: Yup.string().required("Required."),
    address: Yup.string().required("Required."),
    zipCode: Yup.string().required("Required."),
    addressName: Yup.string().required("Required."),
  });

  const submitHandler = async (values) => {
    dispatch(
      addUserAddress(
        values.country,
        values.state,
        values.address,
        values.zipCode,
        values.addressName
      )
    );
    setOpen(false);
  };

  const deletAddress = async (id) => {
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
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
              className="w-[85%] 800px:w-[35%] h-[80vh] bg-white rounded shadow relative p-4 overflow-y-scroll"
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
              <h1 className="text-center text-[25px] font-Poppins">
                Add New Address
              </h1>
              <div className="w-full">
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
                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <div className="mt-1">
                          <select
                            id="country"
                            value={values.country}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${
                              errors.country && touched.country
                                ? "focus:ring-rose-500 focus:border-rose-500 hover:border-rose-500 border-rose-500"
                                : "focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 border-gray-300"
                            } duration-500 sm:text-sm`}
                          >
                            <option value="">Choose your country...</option>
                            {Country &&
                              Country.getAllCountries().map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                          {errors.country && touched.country && (
                            <p className="text-sm ml-2 text-rose-600">
                              {errors.country}
                            </p>
                          )}
                        </div>
                      </div>
                      <br />
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State
                        </label>
                        <div className="mt-1">
                          <select
                            id="state"
                            value={values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none ${
                              errors.state && touched.state
                                ? "focus:ring-rose-500 focus:border-rose-500 hover:border-rose-500 border-rose-500"
                                : "focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 border-gray-300"
                            } duration-500 sm:text-sm`}
                          >
                            <option value="">Choose your state...</option>
                            {State &&
                              State.getStatesOfCountry(values.country).map(
                                (item) => (
                                  <option key={item.isoCode} value={item.name}>
                                    {item.name}
                                  </option>
                                )
                              )}
                          </select>
                          {errors.state && touched.state && (
                            <p className="text-sm ml-2 text-rose-600">
                              {errors.state}
                            </p>
                          )}
                        </div>
                      </div>
                      <br />
                      <Input
                        id="address"
                        label="Address"
                        type="textarea"
                        placeholder="Enter your address..."
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={errors.address && touched.address}
                        error={errors.address}
                      />
                      <br />
                      <Input
                        id="zipCode"
                        label="Zip Code"
                        type="number"
                        placeholder="Enter your zip code..."
                        value={values.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={errors.zipCode && touched.zipCode}
                        error={errors.zipCode}
                      />
                      <br />
                      <Input
                        id="addressName"
                        label="Address Name"
                        type="text"
                        placeholder="Enter your address name..."
                        value={values.addressName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={errors.addressName && touched.addressName}
                        error={errors.addressName}
                      />
                      <br />
                      <button
                        type="submit"
                        className={`${styles.button} !w-full`}
                      >
                        Add
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="flex w-full items-center justify-between">
        <h1 className="800px:text-[25px] font-[600] text-[#000000ba] pb-2">
          Address
        </h1>
        <div
          className={`${styles.button} !w-[100px] ml-3 800px:ml-0 !rounded-md`}
          onClick={() => setOpen(!open)}
        >
          <span className="text-[12px]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user?.addresses?.map((address) => (
          <div
            key={address._id}
            className="mb-2 w-full bg-white rounded-[4px] 800px:flex-row flex-col gap-5 p-4 h-full flex items-center px-3 shadow justify-between pr-10"
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600] text-[12px] 800px:text-[unset]">
                {address.addressName}
              </h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {address.country} / {address.state} / {address.address}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {address.zipCode}
              </h6>
            </div>
            <motion.div
              whileHover={{ scale: 1.2, color: "red" }}
              whileTap={{ scale: 0.9 }}
              className="min-w-[10%] flex items-center justify-between pl-8"
              onClick={() => deletAddress(address._id)}
            >
              <AiOutlineDelete size={25} className="cursor-pointer" />
            </motion.div>
          </div>
        ))}
      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          There is no adddres added
        </h5>
      )}
    </div>
  );
};

export default Address;
