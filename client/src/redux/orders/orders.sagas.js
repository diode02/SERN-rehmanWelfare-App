import { takeLatest, call, put, all } from "redux-saga/effects";
import { getOdersAPI, postOdersAPI } from "../../utils/orders.utils";
import {
  fetchOrdersSuccess,
  fetchOrdersFailure,
  postOrderSuccess,
  postOrderFailure,
} from "./orders.actions";
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

export function* postOrderStartAsync({ payload }) {
  try {
    const order = yield postOdersAPI(payload);
    yield put(postOrderSuccess(order));
  } catch (error) {
    yield put(postOrderFailure(error));
  }
}

export function* onPostOrderStart() {
  yield takeLatest(OrdersActionTypes.POST_ORDER_START, postOrderStartAsync);
}

export function* ordersSagas() {
  yield all([call(onFetchOrdersStart), call(onPostOrderStart)]);
}
