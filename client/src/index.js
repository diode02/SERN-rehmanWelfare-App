import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import customTheme from "./theme";
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ThemeProvider theme={customTheme}>
          <CSSReset />
          <ColorModeProvider>
            <App />
          </ColorModeProvider>
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
