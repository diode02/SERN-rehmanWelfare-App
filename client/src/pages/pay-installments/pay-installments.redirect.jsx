import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import PayInstallemntsPageSpinner from "./pay-installments.cont";

import { fetchCustomersStart } from "../../redux/customers/customers.actions";

const PayInstallmentRedirectPage = ({ match, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomersStart());
  }, [dispatch]);
  return (
    <div>
      <Route
        exact
        path={`${match.path}`}
        component={PayInstallemntsPageSpinner}
      />
    </div>
  );
};

export default PayInstallmentRedirectPage;
