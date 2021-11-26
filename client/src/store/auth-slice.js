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
      console.log(action.payload, "Payload");
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    resetAuth: (state)=>{
      state = authState;
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
