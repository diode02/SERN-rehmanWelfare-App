import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./users/user.reducer";
import ordersReducer from "./orders/orders.reducer";
import customersReducer from "./customers/customers.reducer";
import productsReducer from "./products/products.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  orders: ordersReducer,
  customers: customersReducer,
  products: productsReducer,
});

export default persistReducer(persistConfig, rootReducer);
