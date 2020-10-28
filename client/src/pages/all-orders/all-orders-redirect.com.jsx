import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import OrdersPageContainer from "./all-orders.cont";

import { fetchOrdersStart } from "../../redux/orders/orders.actions";

const OrdersSpinnerPage = ({ match, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersStart());
  }, [dispatch]);
  return (
    <div>
      <Route exact path={`${match.path}`} component={OrdersPageContainer} />
    </div>
  );
};

export default OrdersSpinnerPage;
