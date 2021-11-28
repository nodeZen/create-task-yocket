import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Register from "./Components/Register/register";
import Dashboard from "./Components/Dashboard/dashboard";
import Login from "./Components/Login/login";

import { isUserAuthenticated } from "./services/auth-service";

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserAuthenticated());
  }, [dispatch]);

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  let isMobile = width <= 990;

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => <Redirect to="/dashboard" />}
            />
            <Route
              exact
              path="/login"
              render={props =>
                isAuthenticated ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Login {...props} isMobile={isMobile} />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={props =>
                isAuthenticated ? (
                  <Redirect to="/login" />
                ) : (
                  <Register {...props} isMobile={isMobile} />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={props =>
                isAuthenticated ? (
                  <Dashboard {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
