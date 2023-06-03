import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";

import axios from "axios";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [nameTouched, setNameTouched] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [name, setName] = useState("");

  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");

  const [phoneNumberTouched, setPhoneNumberTouched] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [countryTouched, setCountryTouched] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [country, setCountry] = useState("");

  const [stateTouched, setStateTouched] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [state, setState] = useState("");

  const [zipCodeTouched, setZipCodeTouched] = useState(false);
  const [zipCodeError, setZipCodeError] = useState(false);
  const [zipCode, setZipCode] = useState("");

  const [addressTouched, setAddressTouched] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [address, setAddress] = useState("");

  const [couponCodeTouch, setCouponCodeTouched] = useState(false);
  const [couponCodeError, setCouponCodeError] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const [couponCodeData, setCouponCodeData] = useState("");
  const [discountPercentenge, setDiscountPercentenge] = useState("");

  const navigate = useNavigate();

  let subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    subTotalPrice = cart.reduce(
      (acc, item) => acc + item.qty * item.discountPrice,
      0
    );
  }, [cart]);

  const shipping = subTotalPrice * 0.1;

  let totalPrice = couponCodeData
    ? (
        subTotalPrice +
        shipping -
        (subTotalPrice + shipping) * discountPercentenge
      ).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    totalPrice = couponCodeData
      ? (
          subTotalPrice +
          shipping -
          (subTotalPrice + shipping) * discountPercentenge
        ).toFixed(2)
      : (subTotalPrice + shipping).toFixed(2);
  }, [couponCodeData, cart]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (couponCode.trim().length === 0) {
      setCouponCodeError("Required");
      return setCouponCodeTouched(true);
    }

    await axios
      .get(
        `https://ecommerce-server-ajsh.onrender.com/coupon-code/apply-coupon-code/${couponCode}`
      )
      .then((res) => {
        if (res.data.couponCode === null) {
          setCouponCode("");
          return toast.error("Coupon code doesn't exists!");
        }

        if (
          subTotalPrice > res.data.couponCode.maxAmount &&
          res.data.couponCode.maxAmount !== null
        ) {
          return toast.error(
            "The max price allowed to use this coupon code is $" +
              res.data.couponCode.maxAmount
          );
        }

        if (
          subTotalPrice < res.data.couponCode.minAmount &&
          res.data.couponCode.minAmount !== null
        ) {
          return toast.error(
            "The min price allowed to use this coupon code is $" +
              res.data.couponCode.minAmount
          );
        }

        toast.success("The price has been discounted");

        setCouponCodeData(res.data.couponCode);
        setDiscountPercentenge(res.data.couponCode.discountPercentage / 100);
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  const paymentSubmit = () => {
    if (name.trim().length === 0) {
      setNameError("Required");
      return setNameTouched(true);
    }

    if (email.trim().length === 0) {
      setEmailTouched(true);
      return setEmailError("Required");
    }

    if (!email.trim().match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
      setEmailTouched(true);
      return setEmailError("Please enter a valid email");
    }

    if (phoneNumber === "") {
      setPhoneNumberTouched(true);
      return setPhoneNumberError("Required");
    }

    if (zipCode === "") {
      setZipCodeTouched(true);
      return setZipCodeError("Required");
    }

    if (country.trim().length === 0) {
      setCountryTouched(true);
      return setCountryError("Required");
    }

    if (state.trim().length === 0) {
      setStateTouched(true);
      return setStateError("Required");
    }

    if (address.trim().length === 0) {
      setAddressTouched(true);
      return setAddressError("Required");
    }

    const shippingAddress = {
      country,
      state,
      address,
      zipCode,
    };

    let discountPrice = (subTotalPrice + shipping) * discountPercentenge;

    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping: shipping.toFixed(2),
      discountPrice: discountPrice.toFixed(2),
      shippingAddress,
      user,
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));

    navigate("/payment");
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            name={name}
            setName={setName}
            nameError={nameError}
            setNameError={setNameError}
            email={email}
            setEmail={setEmail}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState}
            zipCode={zipCode}
            setZipCode={setZipCode}
            address={address}
            setAddress={setAddress}
            emailError={emailError}
            setEmailError={setEmailError}
            phoneNumberError={phoneNumberError}
            setPhoneNumberError={setPhoneNumberError}
            countryError={countryError}
            setCountryError={setCountryError}
            stateError={stateError}
            setStateError={setStateError}
            zipCodeError={zipCodeError}
            setZipCodeError={setZipCodeError}
            addressError={addressError}
            setAddressError={setAddressError}
            nameTouched={nameTouched}
            setNameTouched={setNameTouched}
            emailTouched={emailTouched}
            setEmailTouched={setEmailTouched}
            phoneNumberTouched={phoneNumberTouched}
            setPhoneNumberTouched={setPhoneNumberTouched}
            countryTouched={countryTouched}
            setCountryTouched={setCountryTouched}
            stateTouched={stateTouched}
            setStateTouched={setStateTouched}
            zipCodeTouched={zipCodeTouched}
            setZipCodeTouched={setZipCodeTouched}
            addressTouched={addressTouched}
            setAddressTouched={setAddressTouched}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={
              (subTotalPrice + shipping) * discountPercentenge
            }
            couponCodeError={couponCodeError}
            setCouponCodeError={setCouponCodeError}
            couponCodeTouch={couponCodeTouch}
            setCouponCodeTouched={setCouponCodeTouched}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  country,
  setCountry,
  state,
  setState,
  zipCode,
  setZipCode,
  address,
  setAddress,
  email,
  setEmail,
  nameError,
  setNameError,
  emailError,
  setEmailError,
  countryError,
  setCountryError,
  phoneNumberError,
  setPhoneNumberError,
  stateError,
  setStateError,
  zipCodeError,
  setZipCodeError,
  addressError,
  setAddressError,
  nameTouched,
  setNameTouched,
  emailTouched,
  setEmailTouched,
  phoneNumberTouched,
  setPhoneNumberTouched,
  countryTouched,
  setCountryTouched,
  stateTouched,
  setStateTouched,
  zipCodeTouched,
  setZipCodeTouched,
  addressTouched,
  setAddressTouched,
}) => {
  const { user } = useSelector((state) => state.user);

  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {
    if (user?.name) setName(user?.name);
    if (user?.email) setEmail(user?.email);
    if (user?.phoneNumber) setPhoneNumber(user?.phoneNumber);
  }, [
    setEmail,
    setName,
    setPhoneNumber,
    user?.email,
    user?.name,
    user?.phoneNumber,
  ]);

  useEffect(() => {
    if (nameTouched) {
      if (name.trim().length === 0) {
        return setNameError("Required");
      }
    }

    setNameError("");
  }, [name, nameTouched, setNameError]);

  useEffect(() => {
    if (phoneNumberTouched) {
      if (phoneNumber === "") {
        return setPhoneNumberError("Required");
      }
    }

    setPhoneNumberError("");
  }, [phoneNumber, phoneNumberTouched, setPhoneNumberError]);

  useEffect(() => {
    if (countryTouched) {
      if (country.trim().length === 0) {
        return setCountryError("Required");
      }
    }

    setCountryError("");
  }, [country, countryTouched, setCountryError]);

  useEffect(() => {
    if (emailTouched) {
      if (email.trim().length === 0) {
        return setEmailError("Required");
      }
      if (!email.trim().match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
        return setEmailError("Please enter a valid email");
      }
    }

    setEmailError("");
  }, [email, emailTouched, setEmailError]);

  useEffect(() => {
    if (stateTouched) {
      if (state.trim().length === 0) {
        return setStateError("Required");
      }
    }

    setStateError("");
  }, [setStateError, state, stateTouched]);

  useEffect(() => {
    if (zipCodeTouched) {
      if (zipCode === "") {
        return setZipCodeError("Required");
      }
    }

    setZipCodeError("");
  }, [setZipCodeError, zipCode, zipCodeTouched]);

  useEffect(() => {
    if (addressTouched) {
      if (address.trim().length === 0) {
        return setAddressError("Required");
      }
    }

    setAddressError("");
  }, [address, addressTouched, setAddressError]);

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <div className="w-full flex flex-col 800px:flex-row pb-3">
        <div className="800px:w-[50%]">
          <label className="block pb-2 pt-2">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            className={`${styles.input} 800px:!w-[95%] ${
              nameError && nameTouched && "border-rose-500"
            }`}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setNameTouched(true)}
          />
          {nameError && nameTouched && (
            <p className="text-sm ml-2 text-rose-600">{nameError}</p>
          )}
        </div>
        <div className="800px:w-[50%]">
          <label className="block pb-2 pt-2">Email Address</label>
          <input
            id="email"
            type="text"
            value={email}
            className={`${styles.input} ${
              emailError && emailTouched && "border-rose-500"
            }`}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
          />
          {emailError && emailTouched && (
            <p className="text-sm ml-2 text-rose-600">{emailError}</p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col 800px:flex-row pb-3">
        <div className="800px:w-[50%]">
          <label className="block pb-2 pt-2">Phone Number</label>
          <input
            type="number"
            id="phoneNumber"
            value={phoneNumber}
            className={`${styles.input} 800px:!w-[95%] ${
              phoneNumberError && phoneNumberTouched && "border-rose-500"
            }`}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onBlur={() => setPhoneNumberTouched(true)}
          />
          {phoneNumberError && phoneNumberTouched && (
            <p className="text-sm ml-2 text-rose-600">{phoneNumberError}</p>
          )}
        </div>
        <div className="800px:w-[50%]">
          <label className="block pb-2 pt-2">Zip Code</label>
          <input
            type="number"
            id="zipCode"
            value={zipCode}
            className={`${styles.input} ${
              zipCodeError && zipCodeTouched && "border-rose-500"
            }`}
            onChange={(e) => setZipCode(e.target.value)}
            onBlur={() => setZipCodeTouched(true)}
          />
          {zipCodeError && zipCodeTouched && (
            <p className="text-sm ml-2 text-rose-600">{zipCodeError}</p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col 800px:flex-row pb-3">
        <div className="800px:w-[50%]">
          <label className="block pb-2 pt-2">Country</label>
          <select
            className={`w-[100%] 800px:w-[95%] border h-[40px] rounded-[5px] ${
              countryError && countryTouched && "border-rose-500"
            }`}
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            onBlur={() => setCountryTouched(true)}
          >
            <option className="block pb-2" value="">
              Choose your country
            </option>
            {Country &&
              Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </select>
          {countryError && countryTouched && (
            <p className="text-sm ml-2 text-rose-600">{countryError}</p>
          )}
        </div>
        <div className="800px:w-[50%]">
          <label className="block pb-2 pt-2">State</label>
          <select
            className={`w-[100%] border h-[40px] rounded-[5px] ${
              stateError && stateTouched && "border-rose-500"
            }`}
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            onBlur={() => setStateTouched(true)}
          >
            <option className="block pb-2" value="">
              Choose your state
            </option>
            {State &&
              State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
          {stateError && stateTouched && (
            <p className="text-sm ml-2 text-rose-600">{stateError}</p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col 800px:flex-row pb-3">
        <div className="w-[100%]">
          <label className="block pb-2 pt-2">Address</label>
          <textarea
            rows={4}
            id="address"
            value={address}
            onBlur={() => setAddressTouched(true)}
            onChange={(e) => setAddress(e.target.value)}
            className={`${styles.input} !outline-0 !w-[100%] ${
              addressError && addressTouched && "border-rose-500"
            }`}
          />
          {addressError && addressTouched && (
            <p className="text-sm ml-2 text-rose-600">{addressError}</p>
          )}
        </div>
      </div>
      <motion.h5
        className="text-[18px] cursor-pointer inline-block duration-500 hover:text-blue-500"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose from saved address
      </motion.h5>
      <AnimatePresence>
        {userInfo && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0, opacity: 0 }}
          >
            {user &&
              user.addresses.map((item, index) => (
                <div className="w-full flex mt-1" key={index}>
                  <input
                    type="checkbox"
                    className="mr-3"
                    value={item.addressName}
                    onClick={() => {
                      setAddress(item.address);
                      setZipCode(item.zipCode);
                      setState(item.state);
                      setCountry(item.country);
                    }}
                  />
                  <h2>{item.addressName}</h2>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
  couponCodeError,
  setCouponCodeError,
  couponCodeTouch,
  setCouponCodeTouched,
}) => {
  useEffect(() => {
    if (couponCodeTouch) {
      if (couponCode.trim().length === 0) {
        return setCouponCodeError("Required");
      }
    }

    setCouponCodeError("");
  }, [couponCode, couponCodeTouch, setCouponCodeError]);

  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal :</h3>
        <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping :</h3>
        <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount :</h3>
        <h5 className="text-[18px] font-[600]">
          -{" "}
          {discountPercentenge
            ? "$" + discountPercentenge.toFixed(2).toString()
            : null}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Total :</h3>
        <h5 className="text-[18px] font-[600]">${totalPrice}</h5>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Coupon code"
          id="couponCode"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          onBlur={() => setCouponCodeTouched(true)}
          isValid={couponCodeError && couponCodeTouch}
          error={couponCodeError}
        />
        <button
          className={`w-full h-[40px] border border-[#f27a1a] text-center text-[#f27a1a] rounded-[3px] mt-8 cursor-pointer hover:text-[#fff] hover:bg-[#f27a1a] duration-300`}
          type="submit"
        >
          Apply code
        </button>
      </form>
    </div>
  );
};

export default Checkout;
