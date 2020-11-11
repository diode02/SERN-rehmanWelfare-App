import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  getCustomersApi,
  postCustomerApi,
  getAvatarApi,
} from "../../utils/customers.utils";
import {
  fetchCustomersSuccess,
  fetchCustomersFailure,
  postCustomerSuccess,
  postCustomerFailure,
  getAvatarFailure,
  getAvatarSucess,
} from "./customers.actions";
import CustomersActionTypes from "./customers.types";

export function* fetchCustomersStartAsync({ payload }) {
  try {
    const customers = yield getCustomersApi(payload);
    yield put(fetchCustomersSuccess(customers));
  } catch (error) {
    yield put(fetchCustomersFailure(error));
  }
}

export function* onFetchCustomersStart() {
  yield takeLatest(
    CustomersActionTypes.FETCH_CUSTOMERS_START,
    fetchCustomersStartAsync
  );
}

export function* postCustomerStartAsync({ payload }) {
  try {
    const customers = yield postCustomerApi(payload);
    yield put(postCustomerSuccess(customers));
  } catch (error) {
    yield put(postCustomerFailure(error));
  }
}

export function* getAvatar({ payload }) {
  try {
    const avatar = yield getAvatarApi(payload);
    yield put(getAvatarSucess({ avatar, payload }));
  } catch (error) {
    yield put(getAvatarFailure(error));
  }
}

export function* onGetAvatarStart() {
  yield takeLatest(CustomersActionTypes.GET_AVATAR_START, getAvatar);
}

export function* onPostCustomerStart() {
  yield takeLatest(
    CustomersActionTypes.POST_CUSTOMER_START,
    postCustomerStartAsync
  );
}

export function* customersSagas() {
  yield all([
    call(onFetchCustomersStart),
    call(onGetAvatarStart),
    call(onPostCustomerStart),
  ]);
}
