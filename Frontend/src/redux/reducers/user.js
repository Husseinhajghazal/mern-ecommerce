import { createReducer } from "@reduxjs/toolkit";

const initalState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initalState, {
  loadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  // update user
  updataUserInfoRequest: (state) => {
    state.loading = true;
  },
  updateUserInfoRequest: (state) => {
    state.loading = true;
  },
  updateUserInfoSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  updateUserInfoFailed: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //
  addUserAddressRequest: (state) => {
    state.loading = true;
  },
  addUserAddressSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  addUserAddressFailed: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //
  deleteAddressRequest: (state) => {
    state.loading = true;
  },
  deleteAddressSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  deleteAddressFailed: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  //
  clearErrors: (state) => {
    state.error = null;
  },
});
