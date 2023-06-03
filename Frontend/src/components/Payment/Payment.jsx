import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { AnimatePresence, motion } from "framer-motion";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";

import { toast } from "react-toastify";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `https://ecommerce-server-ajsh.onrender.com/payment/process`,
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });
      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axios
            .post(
              `https://ecommerce-server-ajsh.onrender.com/order/create-order`,
              order,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              navigate("/order/success");
              localStorage.setItem("cartItems", JSON.stringify([]));
              localStorage.setItem("latestOrder", JSON.stringify([]));
              window.location.reload();
            });
        }
      }
    } catch (error) {
      toast.error("An error occurred, your order was not successful.");
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    try {
      order.paymentInfo = {
        type: "Cash On Delivery",
      };

      await axios
        .post(
          `https://ecommerce-server-ajsh.onrender.com/order/create-order`,
          order,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          navigate("/order/success");
          localStorage.setItem("cartItems", JSON.stringify([]));
          localStorage.setItem("latestOrder", JSON.stringify([]));
          window.location.reload();
        });
    } catch (error) {
      toast.error("An error occurred, your order was not successful.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({ user, paymentHandler, cashOnDeliveryHandler }) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>
        <AnimatePresence>
          {select === 1 ? (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "fit-content" }}
              exit={{ height: 0 }}
              className="w-full flex border-b"
            >
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
                onSubmit={paymentHandler}
              >
                <div className="w-full flex flex-col 800px:flex-row 800px:pb-3">
                  <div className="800px:w-[50%] pt-2">
                    <label className="block pb-1">Name On Card</label>
                    <input
                      type="text"
                      required
                      placeholder={user && user.name}
                      value={user && user.name}
                      className={`${styles.input} !h-[35px] 800px:!w-[95%]`}
                    />
                  </div>
                  <div className="800px:w-[50%] pt-2">
                    <label className="block pb-1">Expiry Date</label>
                    <CardExpiryElement
                      className={`${styles.input} !h-[35px]`}
                      options={{
                        placeholder: "MM / YY",
                        style: {
                          base: {
                            fontSize: "19px",
                            lineHeight: "1.5",
                            color: "#444",
                          },
                          empty: {
                            color: "#3a120a",
                            backgroundColor: "transparent",
                            "::placeholder": {
                              color: "#444",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col 800px:flex-row pb-3">
                  <div className="800px:w-[50%] pt-2">
                    <label className="block pb-1">Card Number</label>
                    <CardNumberElement
                      className={`${styles.input} !h-[35px] 800px:!w-[95%]`}
                      options={{
                        style: {
                          base: {
                            fontSize: "19px",
                            lineHeight: "1.5",
                            color: "#444",
                          },
                          empty: {
                            color: "#3a120a",
                            backgroundColor: "transparent",
                            "::placeholder": {
                              color: "#444",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="800px:w-[50%] pt-2">
                    <label className="block pb-1">CVV</label>
                    <CardCvcElement
                      className={`${styles.input} !h-[35px]`}
                      options={{
                        style: {
                          base: {
                            fontSize: "19px",
                            lineHeight: "1.5",
                            color: "#444",
                          },
                          empty: {
                            color: "#3a120a",
                            backgroundColor: "transparent",
                            "::placeholder": {
                              color: "#444",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className={`${styles.button} !bg-[#f27a1a] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                />
              </motion.form>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <br />
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>
        <AnimatePresence>
          {select === 2 ? (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "fit-content" }}
              exit={{ height: 0 }}
              className="w-full flex"
            >
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
                onSubmit={cashOnDeliveryHandler}
              >
                <input
                  type="submit"
                  value="Confirm"
                  className={`${styles.button} !bg-[#f27a1a] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                />
              </motion.form>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal :</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping :</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount :</h3>
        <h5 className="text-[18px] font-[600]">
          - ${orderData?.discountPrice}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Total :</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.totalPrice}</h5>
      </div>
      <br />
    </div>
  );
};

export default Payment;
