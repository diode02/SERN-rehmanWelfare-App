import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header/header-com";
import SignInSignUp from "./pages/sign-in-sign-up/sign-in-sign-up.com";
import "./App.css";
import HomePage from "./pages/homepage/homepage-com";
import OrdersSpinnerPage from "./pages/all-orders/all-orders-redirect.com";
import OrderSpinnerPage from "./pages/order/order-redirect.com";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import CustomerRedirectPage from "./pages/customers/customers-redirect.com";
import NewCustomerPage from "./pages/new-customer/customer.com";
import PayInstallmentRedirectPage from "./pages/pay-installments/pay-installments.redirect";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={SignInSignUp} />
        <Route exact path="/signup" component={SignInSignUp} />
        <Route exact path="/orders" component={OrdersSpinnerPage} />
        <Route exact path="/neworder" component={OrderSpinnerPage} />
        <Route exact path="/customers" component={CustomerRedirectPage} />
        <Route exact path="/newcustomer" component={NewCustomerPage} />
        <Route
          exact
          path="/payinstallment"
          component={PayInstallmentRedirectPage}
        />
      </Switch>
    </div>
  );
}

export default App;
