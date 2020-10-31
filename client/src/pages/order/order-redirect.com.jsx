import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import OrderPageSpinner from "./order.cont";

import { fetchCustomersStart } from "../../redux/customers/customers.actions";
import { fetchProductsStart } from "../../redux/products/products.actions";

const OrderRedirectPage = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchProductsStart({
        attributes: ["product_name", "price", "product_id"],
      })
    );
    dispatch(fetchCustomersStart());
  }, [dispatch]);
  return (
    <div>
      <Route exact path={`${match.path}`} component={OrderPageSpinner} />
    </div>
  );
};

export default OrderRedirectPage;
