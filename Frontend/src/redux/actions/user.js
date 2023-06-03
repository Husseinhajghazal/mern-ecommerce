import axios from "axios";

import { toast } from "react-toastify";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(
      `https://ecommerce-server-ajsh.onrender.com/user/get-user`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(
      `https://ecommerce-server-ajsh.onrender.com/shop/get-shop`,
      {
        headers: {
          Authorization: localStorage.getItem("seller-token"),
        },
      }
    );
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};

export const updateUserInfo =
  (email, password, phoneNumber, name) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });
      const { data } = await axios.put(
        `https://ecommerce-server-ajsh.onrender.com/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });

      toast.success("Changing your Info succeded.");
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

export const addUserAddress =
  (country, state, address, zipCode, addressName) => async (dispatch) => {
    try {
      dispatch({
        type: "addUserAddressRequest",
      });

      const { data } = await axios.post(
        `https://ecommerce-server-ajsh.onrender.com/user/add-address`,
        {
          country,
          state,
          address,
          zipCode,
          addressName,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      dispatch({
        type: "addUserAddressSuccess",
        payload: data.user,
      });

      toast.success("Adding new address succeded.");
    } catch (error) {
      dispatch({
        type: "addUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };

export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteAddressRequest",
    });

    const { data } = await axios.delete(
      `https://ecommerce-server-ajsh.onrender.com/user/delete-address/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "deleteAddressSuccess",
      payload: data.user,
    });

    toast.success("Deleting address succeded.");
  } catch (error) {
    dispatch({
      type: "deleteAddressFailed",
      payload: error.response.data.message,
    });
  }
};
