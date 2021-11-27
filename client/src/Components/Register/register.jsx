import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import validator from "validator";
import { registerService } from "../../services/auth-service";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage } from "../../store/auth-slice";

const Register = () => {
  const [inputs, setInputs] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const errMessage = useSelector((state) => state.auth.errMessage);

  const { email, password, firstName, lastName } = inputs;

  const onChangeInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = { firstName, lastName, email, password };
    if (validator.isEmail(email)) {
      if (firstName && password) {
        dispatch(registerService(body));
      } else {
        dispatch(setErrorMessage("Please fill in all fields"));
      }
    } else {
      dispatch(setErrorMessage("Invalid email id"));
    }
  };

  const clearErrorMessage = () => {
    dispatch(setErrorMessage(""));
  };

  return (
    <Fragment>
      <form onSubmit={onSubmitForm}>
        <h1 className="text-center my-5">Task Creator Register</h1>
        <div className="register-controls">
          <div className="row">
            <div className="col-md-6 nopadding-left">
              <input
                type="text"
                placeholder="First Name"
                className="form-control my-2"
                name="firstName"
                value={firstName}
                onChange={onChangeInputs}
              ></input>
            </div>
            <div className="col-md-6 nopadding-right">
              <input
                type="text"
                placeholder="Last Name"
                className="form-control my-2"
                name="lastName"
                value={lastName}
                onChange={onChangeInputs}
              ></input>
            </div>
          </div>
          <div className="row">
            <input
              type="text"
              placeholder="Email"
              className="form-control my-2"
              name="email"
              value={email}
              onChange={onChangeInputs}
            ></input>
            <input
              type="password"
              placeholder="Password"
              className="form-control my-2"
              name="password"
              value={password}
              onChange={onChangeInputs}
            ></input>
            {errMessage && (
              <div className="my-2 error-message p-0">{errMessage}</div>
            )}
            <button className="btn btn-success btn-block" type="submit">
              Register
            </button>
            <div className="my-2 p-0">
              Already have an account?{" "}
              <Link to="/login" onClick={clearErrorMessage}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Register;
