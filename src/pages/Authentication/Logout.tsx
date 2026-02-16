import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { logoutUser } from "../../slices/thunks";

//redux
import { useDispatch } from "react-redux";

import withRouter from "../../Components/Common/withRouter";
// import { createSelector } from "reselect";

const Logout = () => {
  const dispatch: any = useDispatch();

  // Inside your component
  const isUserLogout = true;

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  if (isUserLogout) {
    return <Navigate to="/login" />;
  }

  return <React.Fragment></React.Fragment>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
