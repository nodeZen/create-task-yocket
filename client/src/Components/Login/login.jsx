import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { loginService } from "../../services/auth-service";
import { setErrorMessage } from "../../store/auth-slice";
import { setNewtaskList } from "../../store/task-slice";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss"
const Register = () => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const errMessage = useSelector((state) => state.auth.errMessage);
  const { email, password } = inputs;

  const onChangeInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = { email, password };
    dispatch(loginService(body));
  };

  const clearErrorMessage = () => {
    dispatch(setErrorMessage(""));
    dispatch(setNewtaskList([]));
  };
  return (
    <Fragment>
      <form onSubmit={onSubmitForm} className="container">
        <h1 className="text-center my-5">Create a Task Login</h1>
        <div className="login-controls">
          <input
            type="text"
            placeholder="Email"
            className="form-control my-3"
            name="email"
            value={email}
            onChange={onChangeInputs}
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="form-control my-3"
            name="password"
            value={password}
            onChange={onChangeInputs}
          ></input>
          {errMessage && <div className="my-3 error-message">{errMessage}</div>}
          <button className="btn btn-success btn-block" type="submit">
            Login
          </button>
          <div className="my-3">
            Don't have an account?{" "}
            <Link to="/register" onClick={clearErrorMessage}>
              Register
            </Link>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Register;
