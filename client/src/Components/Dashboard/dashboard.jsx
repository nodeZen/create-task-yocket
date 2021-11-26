import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./dashboard.scss";
import { setAuthentication, resetAuth } from "../../store/auth-slice";
import { getUserData } from "../../services/auth-service";
import Tasks from "../Dashboard/Tasks/tasks";
import ConfirmationBox from "../Confirmation Box/confirmation-box";
import logoutIcon from "../../assets/logout-icn.svg";
const Dashboard = () => {
  const name = useSelector(
    (state) => {
      return `${state.auth.firstName || ""} ${state.auth.lastName || ""}`
    }
  );
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const modalHeading = "Logout";
  const modalMessage = "Are You sure You want to Logout?";

  
  const modalHandler = (boolean) => {
    setShowModal(boolean);
  };

  const showModalHandler = () => {
    modalHandler(true);
  };

  const hideModalHandler = () => {
    modalHandler(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setAuthentication(false));
    dispatch(resetAuth());
    hideModalHandler();
  };

  useEffect(() => {
    dispatch(getUserData());
  });

  return (
    <Fragment>
      <div className="header-bar row mt-3">
        <h1 className="col-md-11">Create a Task</h1>
        <div className="col-md-1">
          <span onClick={showModalHandler} className="logout-button">
            <img src={logoutIcon} alt="Logout"></img>
          </span>
        </div>
      </div>
      <h2 className="my-3 text-center">Hi {name}</h2>
      <div className="ml-5 mt-5">
        <Tasks />
      </div>
      <ConfirmationBox
        showModal={showModal}
        yes={logoutHandler}
        no={hideModalHandler}
        heading={modalHeading}
        message={modalMessage}
      />
    </Fragment>
  );
};

export default Dashboard;
