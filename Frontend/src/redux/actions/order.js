import axios from "axios";

export const getAllOrders = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersRequest",
    });

    const { data } = await axios.get(
      `https://ecommerce-server-ajsh.onrender.com/order/get-all-orders/${id}`
    );

    dispatch({
      type: "getAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllOrdersOfShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersOfShopRequest",
    });

    const { data } = await axios.get(
      `https://ecommerce-server-ajsh.onrender.com/order/get-seller-all-orders/${id}`
    );

    dispatch({
      type: "getAllOrdersOfShopSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersOfShopFailed",
      payload: error.response.data.message,
    });
  }
};
