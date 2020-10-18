import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/header/header-com";
import SignInSignUp from "./pages/sign-in-sign-up/sign-in-sign-up.com";
import "./App.css";
import HomePage from "./pages/homepage/homepage-com";
import SignIn from "./components/signIn/sign-in.com";
import OrdersSpinnerPage from "./pages/all-orders/all-orders-redirect.com";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/signup" component={SignInSignUp} />
        <Route exact path="/orders" component={OrdersSpinnerPage} />
        <Route exact path="/customers" component={OrdersSpinnerPage} />
      </Switch>
    </div>
  );
}

export default App;
