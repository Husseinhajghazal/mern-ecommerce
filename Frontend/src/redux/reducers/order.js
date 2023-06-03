import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, {
  getAllOrdersRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  getAllOrdersFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  getAllOrdersOfShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersOfShopSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  getAllOrdersOfShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
