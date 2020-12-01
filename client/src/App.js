import React, { useEffect, useState } from "react";
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
import AddProductPage from "./pages/product/product.com";
import ProductsPage from "./pages/products/products.com";
import InvoiceCom from "./components/reports/inoice.com";
import InvoicesPage from "./pages/invoices/invoices.com";
import Dashboard from "./pages/account-managment/account-managment.com";
import ResetPage from "./pages/accunt-reset/account-reset.com";

function App() {
  let history = useHistory();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {}, []);

  const items = [
    { label: "Home", icon: "pi pi-fw pi-home" },
    { label: "New Order", icon: "pi pi-fw pi-pencil" },
    { label: "Pay Installment", icon: "pi pi-money-bill" },
    { label: "All Orders", icon: "pi pi-money-bill" },
    { label: "All Customers", icon: "pi pi-users" },
    { label: "All Products", icon: "pi pi-user" },
    { label: "New Customer", icon: "pi pi-user-plus" },
    { label: "Add Product", icon: "pi pi-star-o" },
  ];

  const handleSetActiveItem = (url) => {
    switch (url) {
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
      case "Add Product":
        history.push("/product");
        break;
      case "All Products":
        history.push("/products");
        break;
      default:
        history.push("/");
    }
  };

  const [activeItem, setActiveItem] = useState(null);
  return (
    <div>
      <Header />

      <TabMenu
        model={items}
        activeItem={activeItem}
        onTabChange={(e) => {
          setActiveItem(e.value);
          handleSetActiveItem(e.value.label);
        }}
        style={{
          padding: "0 2%",
        }}
      />
      <div
        style={{
          margin: "0 2%",
        }}
      >
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
          <Route
            exact
            path="/product"
            component={user ? AddProductPage : SignInSignUp}
          />
          <Route
            exact
            path="/products"
            component={user ? ProductsPage : SignInSignUp}
          />
          <Route
            exact
            path="/account"
            component={user ? Dashboard : SignInSignUp}
          />
          <Route exact path="/reset" component={ResetPage} />
          <Route exact path="/invoice" component={InvoiceCom} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
