import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header/header-com";
import SignInSignUp from "./pages/sign-in-sign-up/sign-in-sign-up.com";
import "./App.css";
import HomePage from "./pages/homepage/homepage-com";
import OrdersSpinnerPage from "./pages/all-orders/all-orders-redirect.com";
import OrderSpinnerPage from "./pages/order/order-redirect.com";
import { TabMenu } from "primereact/tabmenu";
import { useHistory } from "react-router-dom";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import CustomerRedirectPage from "./pages/customers/customers-redirect.com";
import NewCustomerPage from "./pages/new-customer/customer.com";
import PayInstallmentRedirectPage from "./pages/pay-installments/pay-installments.redirect";
import { useSelector } from "react-redux";

function App() {
  let history = useHistory();
  const user = useSelector((state) => state.user.currentUser);

  const [items, setItems] = useState([
    { label: "Home", icon: "pi pi-fw pi-home" },
    { label: "All Orders", icon: "pi pi-money-bill" },
    { label: "New Order", icon: "pi pi-fw pi-pencil" },
    { label: "Pay Installment", icon: "pi pi-money-bill" },
    { label: "New Customer", icon: "pi pi-user-plus" },
    { label: "All Customers", icon: "pi pi-user" },
    { label: "All Installments", icon: "pi pi-user" },
  ]);
  const [activeItem, setActiveItem] = useState(null);
  return (
    <div>
      <Header />
      <TabMenu
        model={items}
        activeItem={activeItem}
        onTabChange={(e) => {
          setActiveItem(e.value);
          switch (e.value.label) {
            case "Home":
              history.push("/");
              break;
            case "All Orders":
              history.push("/orders");
              break;
            case "New Order":
              history.push("/neworder");
              break;
            case "Pay Installment":
              history.push("/payinstallment");
              break;
            case "New Customer":
              history.push("/newcustomer");
              break;
            case "All Customers":
              history.push("/customers");
              break;
          }
        }}
      />

      <Switch>
        <Route exact path="/" component={user ? HomePage : SignInSignUp} />
        <Route exact path="/login" component={SignInSignUp} />
        <Route exact path="/signup" component={SignInSignUp} />
        <Route
          exact
          path="/orders"
          component={user ? OrdersSpinnerPage : SignInSignUp}
        />
        <Route
          exact
          path="/neworder"
          component={user ? OrderSpinnerPage : SignInSignUp}
        />
        <Route
          exact
          path="/customers"
          component={user ? CustomerRedirectPage : SignInSignUp}
        />
        <Route
          exact
          path="/newcustomer"
          component={user ? NewCustomerPage : SignInSignUp}
        />
        <Route
          exact
          path="/payinstallment"
          component={user ? PayInstallmentRedirectPage : SignInSignUp}
        />
      </Switch>
    </div>
  );
}

export default App;
