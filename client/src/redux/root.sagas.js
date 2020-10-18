import { all, call } from "redux-saga/effects";

import { userSagas } from "./users/user.sagas";
import { ordersSagas } from "./orders/orders.sagas";

export default function* rootSagas() {
  yield all([call(userSagas), call(ordersSagas)]);
}
