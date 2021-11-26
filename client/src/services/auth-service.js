import axios from "axios";
import {
  setAuthentication,
  setErrorMessage,
  setUserData,
} from "../store/auth-slice";

export const isUserAuthenticated = () => (dispatch) => {
  return axios
    .get("/user/is-verify", {
      headers: {
        token: localStorage.token,
      },
    })
    .then((response) => {
      response.data.authorized === true
        ? dispatch(setAuthentication(true))
        : dispatch(setAuthentication(false));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const loginService = (body) => (dispatch) => {
  return axios
    .post("/user/login", body)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        dispatch(setAuthentication(true));
      }
      if (response.data.userExists === false) {
        dispatch(setErrorMessage("User Does Not Exist.Please Register!"));
      }
      if (response.data.isLoggedIn === false) {
        dispatch(setErrorMessage("Invalid Credentials..!!!"));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const registerService = (body) => (dispatch) => {
  return axios
    .post("/user/register", body)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        dispatch(setAuthentication(true));
      } else if (response.data.userExists) {
        dispatch(setErrorMessage("User Exists..!!!"));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserData = () => (dispatch) => {
  return axios
    .get("user/user-data", {
      headers: {
        token: localStorage.token,
      },
    })
    .then((response) => {
      if (response.data) {
        const { firstName, lastName, email } = response.data;
        console.log(response.data,"Response");
        dispatch(
          setUserData({
            firstName,
            lastName,
            email,
          })
        );
      }
    });
};
