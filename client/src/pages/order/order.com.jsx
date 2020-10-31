import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddOrderForm from "../../components/add-order-form/add-order-form.com";
import NewCustomer from "../../components/new-customer/new-customer.com";
import "./sty.css";
// import { selectCustomersID } from "../../redux/customers/customers.selector";

const OrderPage = () => {
  // const customers = useSelector(selectCustomersID);
  // const products = useSelector((state) => state.products.products);

  return (
    <div>
      <NewCustomer />
      <AddOrderForm />
    </div>
  );
};

export default OrderPage;
