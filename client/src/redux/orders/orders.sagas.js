import { takeLatest, call, put, all } from "redux-saga/effects";
import { getOdersAPI } from "../../utils/orders.utils";
import { fetchOrdersSuccess, fetchOrdersFailure } from "./orders.actions";
import OrdersActionTypes from "./orders.types";

export function* fetchOrdersStartAsync({ payload }) {
  try {
    const tasks = yield getOdersAPI(payload);
    yield put(fetchOrdersSuccess(tasks));
  } catch (error) {
    yield put(fetchOrdersFailure(error.message));
  }
}

export function* onFetchOrdersStart() {
  yield takeLatest(OrdersActionTypes.FETCH_ORDERS_START, fetchOrdersStartAsync);
}

export function* ordersSagas() {
  yield all([call(onFetchOrdersStart)]);
}
