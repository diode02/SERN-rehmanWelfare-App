import { all, call } from "redux-saga/effects";

import { userSagas } from "./users/user.sagas";
import { ordersSagas } from "./orders/orders.sagas";
import { customersSagas } from "./customers/customers.sagas";
import { productsSagas } from "./products/products.sagas";
export default function* rootSagas() {
  yield all([
    call(userSagas),
    call(ordersSagas),
    call(customersSagas),
    call(productsSagas),
  ]);
}
