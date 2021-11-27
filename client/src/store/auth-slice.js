import { createSlice } from "@reduxjs/toolkit";
import authState from "./auth.state";

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errMessage = action.payload;
    },
    setUserData: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    resetAuth: (state)=>{
      Object.keys(state).forEach(key=>{
        state[key] = authState[key];
      })
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setAuthentication,
  setErrorMessage,
  setUserData,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
