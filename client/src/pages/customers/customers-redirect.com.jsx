import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import CustomersPageSpinner from "./customers.cont";

import { fetchCustomersStart } from "../../redux/customers/customers.actions";

const CustomerRedirectPage = ({ match, history }) => {
  //   const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (currentUser && history.action !== "PUSH") {
    dispatch(fetchCustomersStart());
    // }
  }, [dispatch]);
  return (
    <div>
      <Route exact path={`${match.path}`} component={CustomersPageSpinner} />
    </div>
  );
};

export default CustomerRedirectPage;
